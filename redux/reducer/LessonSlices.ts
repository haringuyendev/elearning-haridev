import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createLesson, getLesson, getLessonSectionDetail } from "../action/LessonAction";
import { toast } from "react-toastify";

interface IndexedItem {
  id: number;
  type: "lessons" | "quizzesCourse";
  lesson_id: number | null;
  name: string;
}

interface LessonState {
  lessons: any[];
  loading: boolean;
  error: string | null;
  indexing: IndexedItem[] | null;
  currentSection?: any;
  totalPages?: number;
}

const initialState: LessonState = {
  lessons: [],
  loading: false,
  error: null,
  indexing: null,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    indexingLesson(state, action: PayloadAction<{ lessons: any[]; quizzesCourse: any[] }>) {
      const { lessons, quizzesCourse } = action.payload;
      const combinedArray = [
        ...lessons.map((lesson) => ({
          id: lesson.id,
          type: "lessons" as const,
          lesson_id: lesson.lesson_id,
          name: lesson.name,
        })),
        ...quizzesCourse.map((quizCourse) => ({
          id: quizCourse.id,
          type: "quizzesCourse" as const,
          lesson_id: null,
          name: quizCourse.name,
        })),
      ];

      const sortedArray = combinedArray.sort((a, b) => {
        if (a.lesson_id === null && b.lesson_id !== null) return 1;
        if (a.lesson_id !== null && b.lesson_id === null) return -1;
        return (a.lesson_id ?? 0) - (b.lesson_id ?? 0);
      });

      state.indexing = sortedArray;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Lesson
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons.push(action.payload);
        toast.success("Lesson created successfully!");
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to create lesson");
      })

      // Get All Lessons
      .addCase(getLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to fetch lessons");
      })

      // Get Lesson Section Detail
      .addCase(getLessonSectionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonSectionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSection = action.payload;
      })
      .addCase(getLessonSectionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to fetch section detail");
      });
  },
});

export const { indexingLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
