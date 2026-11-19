import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface InitialStateType {
  isOpen: boolean;
  type: string | null;
  id: string | null;
  position: string | null;
}
export type OpenModalType = {
  type: string | 'AddingPost' | 'Post';
  id?: string;
  position?: string;
};
const initialState: InitialStateType = {
  isOpen: false,
  type: null,
  id: null,
  position: null,
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalFunction(state, action: PayloadAction<OpenModalType>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.id = action.payload.id || null;
      state.position = action.payload.position || 'top';
    },
    closeModalFunction() {
      return initialState;
    },
  },
});
export const { openModalFunction, closeModalFunction } = modalSlice.actions;
export default modalSlice.reducer;
