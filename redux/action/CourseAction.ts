import { createAsyncThunk } from "@reduxjs/toolkit";
import getApiUrl from "@/utils/getApiUrl";
import { toast } from "react-toastify";

// ✅ Create course
export const createCourse = createAsyncThunk(
  "course/create",
  async (body: any, { rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "e-course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.course) throw new Error("Failed to create course");
      return data.course;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Update course
export const updateCourse = createAsyncThunk(
  "course/update",
  async (body: any, { rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "e-course/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.course) throw new Error("Failed to update course");
      return data.course;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Get course list
export const getCourse = createAsyncThunk(
  "course/getAll",
  async (
    { status, page = 1, limit = 10, search = "" }: any,
    { rejectWithValue }
  ) => {
    try {
      let url = `${getApiUrl()}e-course/all?status=${status}&page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch courses");

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Get course filter
export const getCourseFilter = createAsyncThunk(
  "course/getFilter",
  async (status: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${getApiUrl()}e-course/filter-all?status=${status}`);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch course filter");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Get course detail
export const getCourseDetail = createAsyncThunk(
  "course/getDetail",
  async (courseId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${getApiUrl()}e-course/detail?courseId=${courseId}`);
      const data = await res.json();

      if (!res.ok || !data.course) throw new Error("Failed to fetch course detail");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Delete course
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (courseId: number, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(getApiUrl() + "e-course/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to delete course");

      toast.success("Course deleted successfully!");
      dispatch(getCourse({ status: "Publish" }));
      return courseId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
