import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createClassThunk,
  editClassThunk,
  deleteClassThunk,
  getClassThunk,
  getEnrollClassThunk,
  updateClassStatusThunk,
  joinClassThunk,
  markLearnDoneThunk,
  getCheckProcessThunk,
  getDetailResultThunk,
  getQuizToMarkThunk,
  getByPrevClassThunk,
  getMarkThunk,
  createNewClassThunk,
} from "../action/ClassAction";
import { toast } from "react-toastify";

interface ClassState {
  classes: any[];
  loading: boolean;
  error: string | null;
  participantsCount: { [key: string]: number } | null;
  instructors: any;
  courses: any;
  enrollClass: any;
  courseType: any;
  checkProcess: any;
  newClass?: any;
  result?: any;
  message?: string;
  quizzesData?: any;
  scoreData?: any;
  resultData?: any;
  completion?: any;
  totalPages?: number;
  totalClass?: number;
  quizData?: any;
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
  participantsCount: null,
  instructors: null,
  courses: null,
  enrollClass: null,
  courseType: null,
  checkProcess: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClassSource(state, action: PayloadAction<any[]>) {
      state.classes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create class
      .addCase(createClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Class created successfully!");
      })
      .addCase(createClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create class";
      })

      // Edit class
      .addCase(editClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Class updated successfully!");
      
        // Giả sử state.classes là mảng các class
        const updatedClass = action.payload; // payload chính là data mới trả về
        const index = state.classes.findIndex(item => item.id === updatedClass.id);
        if (index !== -1) {
          state.classes[index] = updatedClass; // cập nhật lại item
        }
      })
      .addCase(editClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update class";
      })

      // Delete class
      .addCase(deleteClassThunk.fulfilled, (state, action) => {
        state.classes = state.classes.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteClassThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete class";
      })

      // Get all classes
      .addCase(getClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.participantsCount = action.payload.participantsCount;
        state.instructors = action.payload.instructors;
        state.courses = action.payload.courses;
        state.totalClass = action.payload.totalClass;
      })
      .addCase(getClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch classes";
      })

      // Get enrolled classes
      .addCase(getEnrollClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollClass = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getEnrollClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch enrolled classes";
      })

      // Update class status
      .addCase(updateClassStatusThunk.fulfilled, (state, action) => {
        // Handle success if needed
      })

      // Join class
      .addCase(joinClassThunk.fulfilled, (state, action) => {
        // Handle success if needed
      })

      // Mark learn as done
      .addCase(markLearnDoneThunk.fulfilled, (state, action) => {
        // Handle success if needed
      })

      // Get check process
      .addCase(getCheckProcessThunk.fulfilled, (state, action) => {
        state.checkProcess = action.payload.data;
      })
      
      .addCase(getDetailResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailResultThunk.fulfilled, (state, action) => {
        state.result = action.payload.result;
        state.classes = action.payload.class;
        state.message = action.payload.message;
        state.quizzesData = action.payload.quizzesData;
        state.scoreData = action.payload.score;
        state.loading = false;
      })
      .addCase(getDetailResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch detail result";
      })
      .addCase(getQuizToMarkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Get quiz to mark
      .addCase(getQuizToMarkThunk.fulfilled, (state, action) => {
        state.quizData = action.payload.quizzes;
        state.resultData = action.payload.result;
        state.scoreData = action.payload.score;
        state.courseType = action.payload.courseType;
        state.completion = action.payload.completion;
        state.loading=false;
      })
      .addCase(getQuizToMarkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch quiz to mark";
      })

      // Get by prev class
      .addCase(getByPrevClassThunk.fulfilled, (state, action) => {
        state.newClass = action.payload.data;
      })

      // Get mark
      .addCase(getMarkThunk.fulfilled, (state, action) => {
        // Handle success if needed
      })

      // Create new class
      .addCase(createNewClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newClass = action.payload.class;
        toast.success("New class created successfully!");
      })
      .addCase(createNewClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create new class";
      });
  },
});

export const { setClassSource } = classSlice.actions;
export default classSlice.reducer;
