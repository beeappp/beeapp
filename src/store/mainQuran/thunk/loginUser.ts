import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest } from '../types';
import { save } from '../../../utils/storage';
import baseQuranService, {
  accessQuranToken,
  setAuthQuranHeader,
} from '../../../init/axios/baseQuranService';

export const loginUser = createAsyncThunk<
  any,
  LoginRequest,
  { rejectValue: string }
>('resources/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.post<any>(
      '/api/auth/login',
      loginData
    );
    const { token, data } = response.data.data;
    save(accessQuranToken, token);
    setAuthQuranHeader(token);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Invalid credentials.');
  }
});
