import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getFilterCategory,
  getSubCategories,
  getAllSubCategories,
} from "../action/CategoryAction";

export interface CategoryState {
  categories: any[];
  loading: boolean;
  error: any;
  subCategory: any | null;
  subCateFetch: any | null;
  dataCountSub: any | null;
  quizCount: any | null;
  quizCountSub: any | null;
  allCategory: any | null;
  allSubCategory: any | null;
  totalPages?: number;
  totalCate?: number;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  subCategory: null,
  subCateFetch: null,
  dataCountSub: null,
  quizCount: null,
  quizCountSub: null,
  allCategory: null,
  allSubCategory: null
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {

    setSubCategories(state, action: PayloadAction<any>) {
      state.subCateFetch = action.payload.data;
    },
    setCategorySource(state, action: PayloadAction<any[]>) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Get All
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.dataCountSub = action.payload.dataCountSub;
        state.subCategory = action.payload.subCates;
        state.quizCount = action.payload.quizCount;
        state.totalCate = action.payload.totalCate;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Filtered   
      .addCase(getFilterCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFilterCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilterCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload.data;
      })

      // Get Sub Categories by Category
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subCateFetch = action.payload.data;
      })

      // Get All Sub Categories
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.allSubCategory = action.payload.data;
        state.quizCountSub = action.payload.quizCount;
      });
  },
});

export const { setSubCategories, setCategorySource } = categorySlice.actions;
export default categorySlice.reducer;
