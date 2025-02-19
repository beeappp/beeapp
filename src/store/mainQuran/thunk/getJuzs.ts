import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { JuzsResponse } from '../types';

export const getJuzs = createAsyncThunk<
  JuzsResponse,
  void,
  { rejectValue: string }
>('quran/getJuzs', async (_, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<JuzsResponse>(
      '/api/v1/quran/juzs'
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
