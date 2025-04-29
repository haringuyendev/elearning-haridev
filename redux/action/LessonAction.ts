import { createAsyncThunk } from "@reduxjs/toolkit";
import getApiUrl from "../../utils/getApiUrl";

export const createLesson = createAsyncThunk(
  "lesson/create",
  async ({ name, userId, teamId }: any, { rejectWithValue }) => {
    try {
      const response = await fetch(getApiUrl() + "e-quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId, teamId }),
      });

      const data = await response.json();

      if (!response.ok || !data.quiz) {
        throw new Error("Failed to create lesson");
      }

      return data.quiz;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLesson = createAsyncThunk(
    "lesson/getAll",
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${getApiUrl()}e-lesson/all?page=${page}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }
  
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const getLessonSectionDetail = createAsyncThunk(
    "lesson/sectionDetail",
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await fetch(`${getApiUrl()}e-lesson-section/view?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error("Failed to fetch section detail");
        }
  
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  