import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { VersesByJuzRequest, VersesByJuzResponse } from '../types';

export const getVersesByJuzs = createAsyncThunk<
  VersesByJuzResponse,
  VersesByJuzRequest,
  { rejectValue: string }
>(
  'verses/getVersesByJuzs',
  async (
    { juz, surah, words, author, translations, page },
    { rejectWithValue }
  ) => {
    try {
      const response = await baseQuranService.get<VersesByJuzResponse>(
        `/api/v1/quran/juzs/${juz}/${surah}/verses?page=${page}`,
        {
          params: {
            juz,
            surah,
            words,
            author,
            translations,
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
