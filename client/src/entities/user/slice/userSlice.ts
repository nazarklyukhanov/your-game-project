import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  signInThunk,
  signOutThunk,
  signUpThunk,
  refreshTokensThunk,
  activateAccountThunk,
} from "../api/AuthApi";
import { initialUserState, type User } from "../model/index";

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshTokensThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshTokensThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isInitialized = true;
    });
    builder.addCase(refreshTokensThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInitialized = true;
      state.user = null;
    });
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isInitialized = true;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
      state.user = null;
    });
    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isInitialized = true;
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
      state.user = null;
    });
    builder.addCase(signOutThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signOutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isInitialized = true;
    });
    builder.addCase(signOutThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
      state.user = null;
    });
    builder.addCase(activateAccountThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(activateAccountThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
      state.isInitialized = true;
    });
    builder.addCase(activateAccountThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
      state.user = null;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
