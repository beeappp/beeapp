import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse, UserData } from '../types';
import baseService, {
  accessToken,
  setAuthHeader,
} from '../../../init/axios/baseService';
import { save } from '../../../utils/storage';

export const loginUser = createAsyncThunk<
  UserData,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await baseService.post<LoginResponse>(
      '/api/v1/auth/login',
      loginData
    );
    const { token, user } = response.data.data;
    console.log('accessToken, token', token);

    await save(accessToken, token);
    setAuthHeader(token);
    return user;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Invalid credentials.');
  }
});
