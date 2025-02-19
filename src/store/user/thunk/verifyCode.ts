import { createAsyncThunk } from '@reduxjs/toolkit';
import { CodeVerification } from '../types';
import baseService from '../../../init/axios/baseService';

export const verifyCode = createAsyncThunk<
  void,
  CodeVerification,
  { rejectValue: string }
>('auth/verifyCode', async (param, { rejectWithValue }) => {
  try {
    await baseService.post('/api/code/verify', param);
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Invalid credentials.');
  }
});
