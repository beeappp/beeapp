import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';

export const resendValidation = createAsyncThunk<void, string>(
  'auth/resendValidation',
  async (email, { rejectWithValue }) => {
    try {
      await baseService.post('/api/code/resend', { email });
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Error resend validation');
    }
  }
);
