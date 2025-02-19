import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';

export const getSurahByReciter = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('reciter/getSurahByReciter', async (reciterId, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(
      `/api/v1/recources/reciters/${reciterId}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
