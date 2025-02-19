import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';

export const getJuzsBySurahsId = createAsyncThunk<
  void,
  Number,
  { rejectValue: string }
>('quran/getJuzsBySurahsId', async (juzNumber, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(
      `/api/v1/quran/juz/${juzNumber}/surahs`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
