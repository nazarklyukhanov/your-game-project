import type { ServerResponseType } from "../../../shared/types";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserWithToken = {
  user: User;
  accessToken: string;
}


export type UserResponseType = ServerResponseType<UserWithToken>;

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
  activationToken?: string | null;
};

export type SignInData = {
  email: string;
  password: string;
};

export type UpdateUserData = {
  name?: string;
  email?: string;
};

export type UserStateType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
};

export const initialUserState: UserStateType = {
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};
