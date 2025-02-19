import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';

export const getVersesByPageNumber = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>('verses/getVersesByPageNumber', async (pageNumber, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(
      `/api/v1/quran/${pageNumber}/verses`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
