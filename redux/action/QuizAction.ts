import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import getApiUrl from "../../utils/getApiUrl";

// Get all quizzes
export const getQuiz = createAsyncThunk(
  "quiz/getAll",
  async ({ page = 1, limit = 10, teamId, search, type, category, subCate }: any, { rejectWithValue }) => {
    try {
      let url = `${getApiUrl()}e-quiz/all?page=${page}&limit=${limit}`;
      if (teamId) url += `&teamId=${teamId}`;
      if (search) url += `&search=${search}`;
      if (type) url += `&type=${type}`;
      if (category) url += `&category=${category}`;
      if (subCate) url += `&subCate=${subCate}`;

      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch quizzes");

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Get quiz test details
export const getTest = createAsyncThunk(
  "quiz/getTest",
  async (testId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${getApiUrl()}e-course-quiz/details?test_id=${testId}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch test");

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Check quiz do status
export const checkDoStatus = createAsyncThunk(
  "quiz/checkDoStatus",
  async ({ testId, userId }: { testId: number; userId: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${getApiUrl()}e-course-quiz/check-do-status?test_id=${testId}&user_id=${userId}`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error("Failed to check status");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch source quizzes
export const getQuizSource = createAsyncThunk(
  "quiz/getSource",
  async ({ teamId, category, subCategory }: any, { rejectWithValue }) => {
    try {
      const res = await fetch(`${getApiUrl()}e-quiz/source?teamId=${teamId}&category=${category}&subCategory=${subCategory}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch quiz source");

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete quiz
export const deleteQuiz = createAsyncThunk(
  "quiz/delete",
  async (quizId: number, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "e-quiz/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Failed to delete quiz");

      toast.success("Quiz deleted successfully!");
      dispatch(getQuiz({}));
      return quizId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create quiz
export const createQuiz = createAsyncThunk(
  "quiz/create",
  async (payload: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "e-quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.quiz) throw new Error("Failed to create quiz");

      dispatch(getQuiz({}));
      return data.quiz;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update quiz
export const updateQuiz = createAsyncThunk(
  "quiz/update",
  async (payload: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(getApiUrl() + "e-quiz/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.quiz) throw new Error("Failed to update quiz");

      dispatch(getQuiz({}));
      return data.quiz;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
