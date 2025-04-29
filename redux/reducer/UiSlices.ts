import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  toggle: boolean;
  mobile: boolean;
  smallMobileMenu: boolean;
  cartToggle: boolean;
  search: boolean;
  pricing: boolean;
  pricingTwo: boolean;
  pricingThree: boolean;
  pricingFour: boolean;
}

const initialState: UIState = {
  toggle: false,
  mobile: true,
  smallMobileMenu: true,
  cartToggle: true,
  search: true,
  pricing: true,
  pricingTwo: true,
  pricingThree: true,
  pricingFour: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setToggle(state, action: PayloadAction<boolean>) {
      state.toggle = action.payload;
    },
    setMobile(state, action: PayloadAction<boolean>) {
      state.mobile = action.payload;
    },
    setSmallMobileMenu(state, action: PayloadAction<boolean>) {
      state.smallMobileMenu = action.payload;
    },
    setCartToggle(state, action: PayloadAction<boolean>) {
      state.cartToggle = action.payload;
    },
    setSearch(state, action: PayloadAction<boolean>) {
      state.search = action.payload;
    },
    setPricing(state, action: PayloadAction<boolean>) {
      state.pricing = action.payload;
    },
    setPricingTwo(state, action: PayloadAction<boolean>) {
      state.pricingTwo = action.payload;
    },
    setPricingThree(state, action: PayloadAction<boolean>) {
      state.pricingThree = action.payload;
    },
    setPricingFour(state, action: PayloadAction<boolean>) {
      state.pricingFour = action.payload;
    },
  },
});

export const {
  setToggle,
  setMobile,
  setSmallMobileMenu,
  setCartToggle,
  setSearch,
  setPricing,
  setPricingTwo,
  setPricingThree,
  setPricingFour,
} = uiSlice.actions;

export default uiSlice.reducer;
