import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuiz, getTest, checkDoStatus, getQuizSource, deleteQuiz, createQuiz, updateQuiz } from "../action/QuizAction";

interface QuizState {
  quizzes: any[];
  loading: boolean;
  error: string | null;
  totalQuiz:number;
  results: any[];
  quizSource: any[];
  totalPages: number;
  currentPage: number;
}

const initialState: QuizState = {
  quizzes: [],
  totalQuiz: 0,
  loading: false,
  error: null,
  results: [],
  quizSource: [],
  totalPages: 1,
  currentPage: 1,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizSource(state, action: PayloadAction<any[]>) {
      state.quizSource = action.payload;
    },
    fetchQuizSourceSuccess(state, action: PayloadAction<any[]>) {
      state.quizSource = action.payload;
    },
    fetchQuizSuccess(state, action: PayloadAction<any[]>) {
      state.quizzes = action.payload;
    },
    fetchQuizFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    deleteQuizSuccess(state, action: PayloadAction<number>) {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
    },
    deleteQuizFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    createQuizFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    fetchDoStatusSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.results = action.payload;
    },
    fetchDoStatusFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Quiz
    builder
      .addCase(getQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.totalQuiz = action.payload.totalQuiz;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Get Quiz Test
    builder
      .addCase(getTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(getTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Check Do Status
    builder
      .addCase(checkDoStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkDoStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(checkDoStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Get Quiz Source
    builder
      .addCase(getQuizSource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizSource.fulfilled, (state, action) => {
        state.loading = false;
        state.quizSource = action.payload;
      })
      .addCase(getQuizSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Delete Quiz
    builder
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Create Quiz
    builder
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = [...state.quizzes, action.payload];
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Update Quiz
    builder
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.map(quiz => 
          quiz.id === action.payload.id ? action.payload : quiz
        );
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setQuizSource,
  fetchQuizSourceSuccess,
  fetchQuizSuccess,
  fetchQuizFailure,
  deleteQuizSuccess,
  deleteQuizFailure,
  createQuizFailure,
  fetchDoStatusSuccess,
  fetchDoStatusFailure,
} = quizSlice.actions;

export default quizSlice.reducer;
