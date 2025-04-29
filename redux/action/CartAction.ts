import { createAsyncThunk } from "@reduxjs/toolkit";

// Add to cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ id, amount, product }: { id: string; amount: number; product: any }) => {
    return { id, amount, product };
  }
);

// Toggle cart amount
export const toggleCartAmountThunk = createAsyncThunk(
  "cart/toggleAmount",
  async ({ id, value }: { id: string; value: "inc" | "dec" }) => {
    return { id, value };
  }
);

// Delete cart item
export const deleteCartItemThunk = createAsyncThunk(
  "cart/deleteItem",
  async (id: string) => {
    return id;
  }
);
