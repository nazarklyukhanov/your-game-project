import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, setAccessToken } from "../../../shared/lib/axiosInstance";
import type {
  CreateUserData,
  SignInData,
  UserResponseType,
  User,
} from "../model";
import type { ServerResponseType } from "../../../shared/types";
import type { AxiosError } from "axios";

const USER_THUNK_TYPES = {
  SIGN_UP: "user/signUp",
  SIGN_IN: "user/signIn",
  SIGN_OUT: "user/signOut",
  REFRESH_TOKENS: "user/refreshTokens",
  ACTIVATE_ACCOUNT: "user/activateAccount",
} as const;

const USER_API_ENDPOINTS = {
  SIGN_UP: "/auth/signUp",
  SIGN_IN: "/auth/signIn",
  SIGN_OUT: "/auth/signOut",
  REFRESH_TOKENS: "/auth/",
  ACTIVATE_ACCOUNT: "/auth/activate",
} as const;

export const refreshTokensThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(USER_THUNK_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<UserResponseType>(
      USER_API_ENDPOINTS.REFRESH_TOKENS
    );

    setAccessToken(response.data.data?.accessToken ?? "");
    return response.data.data?.user as User;
  } catch (error) {
    const errorMessage =
      (error as AxiosError<ServerResponseType<null>>).response?.data?.message ??
      "Failed to renew session";
    return rejectWithValue(errorMessage);
  }
});

export const signUpThunk = createAsyncThunk<
  User,
  CreateUserData,
  { rejectValue: string }
>(
  USER_THUNK_TYPES.SIGN_UP,
  async (userData: CreateUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        USER_API_ENDPOINTS.SIGN_UP,
        userData
      );

      setAccessToken(response.data.data?.accessToken ?? "");
      return response.data.data?.user as User;
    } catch (error) {
      const errorMessage =
        (error as AxiosError<ServerResponseType<null>>).response?.data
          ?.message ?? "Failed to register user";
      return rejectWithValue(errorMessage);
    }
  }
);

export const signInThunk = createAsyncThunk<
  User,
  SignInData,
  { rejectValue: string }
>(
  USER_THUNK_TYPES.SIGN_IN,
  async (userData: SignInData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        USER_API_ENDPOINTS.SIGN_IN,
        userData
      );

      setAccessToken(response.data.data?.accessToken ?? "");
      return response.data.data?.user as User;
    } catch (error) {
      const errorMessage =
        (error as AxiosError<ServerResponseType<null>>).response?.data
          ?.message ?? "Failed to sign in";
      return rejectWithValue(errorMessage);
    }
  }
);

export const signOutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(USER_THUNK_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.delete<ServerResponseType<null>>(
      USER_API_ENDPOINTS.SIGN_OUT
    );
    setAccessToken("");
    return;
  } catch (error) {
    const errorMessage =
      (error as AxiosError<ServerResponseType<null>>).response?.data?.message ??
      "Failed to sign out";
    return rejectWithValue(errorMessage);
  }
});

export const activateAccountThunk = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>(
  USER_THUNK_TYPES.ACTIVATE_ACCOUNT,
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UserResponseType>(
        `${USER_API_ENDPOINTS.ACTIVATE_ACCOUNT}/${token}`
      );
      return response.data.data?.user as User;
    } catch (error) {
      const errorMessage =
        (error as AxiosError<ServerResponseType<null>>).response?.data
          ?.message ?? "Failed to activate account";
      return rejectWithValue(errorMessage);
    }
  }
);
