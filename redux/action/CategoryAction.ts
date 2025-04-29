import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getApiUrl from '@/utils/getApiUrl';
import { toast } from 'react-toastify';

// ---- THUNK ACTIONS ----

export const createCategory = createAsyncThunk(
  'category/create',
  async ({ category, detail, status, subCategory, teamId, userId }: any, thunkAPI) => {
    const response = await fetch(getApiUrl() + "e-category/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, detail, status, subCategory, teamId, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Create failed');
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, category, detail, status, subCategory, teamId, userId }: any, thunkAPI) => {
    const response = await fetch(getApiUrl() + "e-category/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, category, detail, status, subCategory, teamId, userId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Update failed');
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (cateId: any, thunkAPI) => {
    const response = await fetch(getApiUrl() + "e-category/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cateId }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Delete failed');
    toast.success("Category deleted successfully!");
    return cateId;
  }
);

export const getCategory = createAsyncThunk(
  'category/get',
  async ({ status, page = 1, limit = 10, teamId, category }: any) => {
    let url = `${getApiUrl()}e-category/all?page=${page}&limit=${limit}`;
    if (teamId) url += `&teamId=${teamId}`;
    if (category) url += `&category=${category}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error('Fetch failed');
    return data;
  }
);

export const getFilterCategory = createAsyncThunk(
  'category/getFilters',
  async ({ status, teamId }: any) => {
    const response = await fetch(`${getApiUrl()}e-category/all-filter?status=${status}&teamId=${teamId}`);
    const data = await response.json();
    console.log(data)
    if (!response.ok) throw new Error('Fetch filter failed');
    return data;
  }
);

export const getSubCategories = createAsyncThunk(
  'category/getSub',
  async ({cateId}: any) => {
    const response = await fetch(`${getApiUrl()}e-category/get-sub-category?cate_id=${cateId}`);
    const data = await response.json();
    if (!response.ok) throw new Error('Fetch subcategory failed');
    return data;
  }
);

export const getAllSubCategories = createAsyncThunk(
  'category/getAllSub',
  async () => {
    const response = await fetch(`${getApiUrl()}e-category/get-all-sub-category`);
    const data = await response.json();
    if (!response.ok) throw new Error('Fetch all subcategories failed');
    return data;
  }
);
