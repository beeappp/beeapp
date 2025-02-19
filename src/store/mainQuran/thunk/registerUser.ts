import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterRequest } from '../types';
import baseQuranService, {
  saveQuranTokens,
} from '../../../init/axios/baseQuranService';

export const registerUser = createAsyncThunk<
  any,
  RegisterRequest,
  { rejectValue: string }
>('resources/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.post<any>(
      '/api/auth/register',
      registerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { token, data } = response.data;

    saveQuranTokens(token);

    return data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
