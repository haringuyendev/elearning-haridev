// redux/reducer/userSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllTeams, getAllUsers, loginUser, logoutUser } from "../action/UserAction";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("userLogin");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

interface UserState {
  user: any;
  allUsers: any[] | null;
  allTeams: any[] | null;
  loading: boolean;
  error: string | null;
  msg: string;
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  allUsers: null,
  allTeams: null,
  loading: false,
  error: null,
  msg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("userLogin");
    },
    setMsg(state, action: PayloadAction<string>) {
      state.msg = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Login failed");
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        toast.success("Logged out successfully");
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload?.data || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to fetch users");
      })

      // Get All Teams
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.allTeams = action.payload?.data || [];
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to fetch teams");
      });
  },
});

export const { clearUser, setMsg, setUser } = userSlice.actions;
export default userSlice.reducer;
