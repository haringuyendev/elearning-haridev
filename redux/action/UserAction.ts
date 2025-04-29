import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApiUrl from "../../utils/getApiUrl";
import { clearUser } from "../reducer/UserSlices";

// ======================= Thunks =======================

// 🔐 Login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe: true }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid username or password");

      return data.user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔓 Logout
export const logoutUser = createAsyncThunk<boolean, void>(
  "user/logout",
  async () => {
    await fetch(getApiUrl() + "users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return true;
  }
);

// 👤 Get all users
export const getAllUsers = createAsyncThunk("user/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(getApiUrl() + "users/all");
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch users");
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// 🏢 Get all teams
export const getAllTeams = createAsyncThunk("user/getTeams", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(getApiUrl() + "users/all-team");
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch teams");
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const getLocalUser = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userLogin");
    return data ? JSON.parse(data) : null;
  }
  return null;
};
