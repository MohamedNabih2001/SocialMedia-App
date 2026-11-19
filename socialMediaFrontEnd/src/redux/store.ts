import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './userSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: { user: UserSlice, modal: modalSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
