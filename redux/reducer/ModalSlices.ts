// redux/slices/modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  type: string | null;
  props: any;
}

const initialState: ModalState = {
  type: null,
  props: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: string, props?: any }>) => {
      state.type = action.payload.type;
      state.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.type = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
