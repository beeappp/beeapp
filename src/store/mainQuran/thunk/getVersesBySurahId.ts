import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { QuranVerseResponse, VersesBySurahIdRequest } from '../types';

export const getVersesBySurahId = createAsyncThunk<
  QuranVerseResponse,
  VersesBySurahIdRequest,
  { rejectValue: string }
>(
  'verses/getVersesBySurahId',
  async ({ surah_id, words }, { rejectWithValue }) => {
    try {
      const response = await baseQuranService.get<QuranVerseResponse>(
        '/api/v1/quran',
        {
          params: {
            surah_id,
            words,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('An unknown error occurred.');
    }
  }
);
