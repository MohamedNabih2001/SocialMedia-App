import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ResponseRefresh } from '../../types/types';
import { api } from '../api/axios';
import { io, Socket } from 'socket.io-client';
export let socket: Socket;
export const refreshToken = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/users/refresh');
      socket = io('http://localhost:8000', {
        auth: {
          token: res.data.data.token,
        },
        withCredentials: true,
      });
      return res.data as ResponseRefresh;
    } catch (err) {
      return thunkAPI.rejectWithValue(`Failed to Refresh token : ${err}`);
    }
  }
);
type FriendIdType = {
  id: string;
};
type IntialType = {
  isAuth: boolean | null;
  isAdmin: boolean | null;
  loading?: boolean | null;
  token: string | null;
  user: {
    name: string;
    role: string;
    theme: string;
    email: string;
  } | null;
};
type InputType = {
  token: string;
  name: string;
  role: string;
  email: string;
  theme: string;
};
const initialState: IntialType = {
  isAdmin: null,
  isAuth: null,
  user: null,
  loading: null,
  token: null,
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<InputType>) {
      const user = {
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
        theme: action.payload.theme,
      };
      state.user = user;
      state.isAdmin = action.payload?.role === 'admin' ? true : false;
      state.isAuth = true;
      state.token = action.payload.token;
      socket = io('http://localhost:8000', {
        auth: {
          token: action.payload.token,
        },
        withCredentials: true,
      });
    },
    logOut(state) {
      state.user = initialState.user;
      state.isAdmin = null;
      state.isAuth = null;
      state.loading = false;
    },
    changeThemeApp(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload) {
          const user = {
            name: action.payload.data.name,
            email: action.payload.data.email,
            role: action.payload.data.role,
            theme: action.payload.data.theme,
          };
          const isAdmin = action.payload.data.role === 'admin' ? true : false;
          const isAuth = action.payload.data.token ? true : false;
          state.token = action.payload.data.token;
          state.isAdmin = isAdmin;
          state.isAuth = isAuth;
          state.user = user;
          state.loading = false;
        }
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { signIn, logOut, setLoading, changeThemeApp } = UserSlice.actions;

export default UserSlice.reducer;
