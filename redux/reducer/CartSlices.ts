// redux/reducer/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToCartThunk, toggleCartAmountThunk, deleteCartItemThunk } from "../action/CartAction";

const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("hiStudy");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

interface CartItem {
  id: string;
  amount: number;
  price: number;
  max?: number;
  product: any;
}

interface CartState {
  cart: CartItem[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
  loading: boolean;
  error: boolean;
  msg: string;
}

const initialState: CartState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 80,
  loading: false,
  error: false,
  msg: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = [];
    },
    countCartTotals(state) {
      const { total_items, total_amount } = state.cart.reduce(
        (acc, item) => {
          acc.total_items += item.amount;
          acc.total_amount += item.amount * item.price;
          return acc;
        },
        { total_items: 0, total_amount: 0 }
      );
      state.total_items = total_items;
      state.total_amount = total_amount;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { id, amount, product } = action.payload;
        const existing = state.cart.find((item) => item.id === id);

        if (existing) {
          existing.amount = Math.min(existing.amount + amount, existing.max ?? Infinity);
          state.msg = "already added !!!";
        } else {
          state.cart.push({ id, amount, price: product.price, product });
          state.msg = "item add successfully";
        }
        state.loading = false;
      })
      .addCase(addToCartThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Toggle cart amount
      .addCase(toggleCartAmountThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(toggleCartAmountThunk.fulfilled, (state, action) => {
        const { id, value } = action.payload;
        const item = state.cart.find((i) => i.id === id);
        if (item) {
          if (value === "inc") {
            item.amount = Math.min(item.amount + 1, item.max ?? Infinity);
          } else {
            item.amount = Math.max(item.amount - 1, 1);
          }
        }
        state.loading = false;
      })
      .addCase(toggleCartAmountThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // Delete cart item
      .addCase(deleteCartItemThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCartItemThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { clearCart, countCartTotals } = cartSlice.actions;
export default cartSlice.reducer;
