import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  updateCourse,
  getCourse,
  getCourseFilter,
  getCourseDetail,
  deleteCourse
} from "../action/CourseAction";

interface Course {
  id: string;
  topic_name: string;
  // Add other course properties here
}

interface CourseState {
  course: Course[];
  courseDetail: Course | null;
  loading: boolean;
  error: string | null;
  countLesson: number | null;
  countQuiz: number | null;
  totalPages: number | null;
}

const initialState: CourseState = {
  course: [],
  courseDetail: null,
  loading: false,
  error: null,
  countLesson: null,
  countQuiz: null,
  totalPages: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.fulfilled, (state, action) => {
        state.course.push(action.payload);
        state.loading = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.course.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.course[index] = action.payload;
      })
      .addCase(getCourse.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.course = action.payload.data;
        state.countLesson = action.payload.countLesson;
        state.countQuiz = action.payload.countQuiz;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(getCourseFilter.fulfilled, (state, action) => {
        state.course = action.payload.data;
      })
      .addCase(getCourseDetail.fulfilled, (state, action) => {
        state.courseDetail = action.payload.course;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.course = state.course.filter(c => Number(c.id) === action.payload);
      });
  },
});

export default courseSlice.reducer;
