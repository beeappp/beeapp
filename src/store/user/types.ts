import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  isLoading: boolean;
  user: UserData | null;
  isAuthorized: boolean;
};

// types.ts
export type RegisterRequest = {
  phone: string;
  password: string;
  password_confirmation: string;
  name: string;
  last_name: string;
  email: string;
  approve_confidential: boolean;
};

export type UserData = {
  name: string;
  last_name: string;
  phone: string;
  email: string;
  approve_confidential: boolean;
  updated_at: string;
  email_verified_at: boolean | null;
  created_at: string;
  id: number;
};

export type RegisterResponse = {
  message: string;
  data: {
    user: UserData;
    token: string;
  };
};

export type LoginRequest = {
  phone: string;
  password: string;
};

export type CodeVerification = {
  email?: string;
  activation_code: string;
};

export type LoginResponse = {
  message: string;
  data: {
    user: UserData;
    token: string;
  };
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<UserState, PayloadAction<T>>;
