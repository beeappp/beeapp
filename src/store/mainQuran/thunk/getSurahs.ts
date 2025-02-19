import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { SurahResponse, SurahsRequest } from '../types';

export const getSurahs = createAsyncThunk<
  SurahResponse,
  SurahsRequest | undefined,
  { rejectValue: string }
>('surahs/getSurahs', async (params, { rejectWithValue }) => {
  try {
    if (params) {
      const response = await baseQuranService.get<SurahResponse>(
        '/api/v1/quran/surahs',
        {
          params,
        }
      );

      return response.data;
    } else {
      const response = await baseQuranService.get<SurahResponse>(
        '/api/v1/quran/surahs'
      );
      return response.data;
    }
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
