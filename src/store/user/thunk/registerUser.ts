import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterRequest, RegisterResponse, UserData } from '../types';
import baseService, {
  saveTokens,
  setAuthHeader,
} from '../../../init/axios/baseService';

export const registerUser = createAsyncThunk<
  UserData,
  RegisterRequest,
  { rejectValue: string }
>('auth/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const response = await baseService.post<RegisterResponse>(
      '/api/v1/auth/register',
      registerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { token, user } = response.data.data;

    saveTokens(token);
    setAuthHeader(token);

    return user;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
