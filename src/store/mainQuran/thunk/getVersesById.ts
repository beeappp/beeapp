import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { VersesByIdRequest, VersesResponse } from '../types';

export const getVersesById = createAsyncThunk<
  VersesResponse,
  VersesByIdRequest,
  { rejectValue: string }
>(
  'verses/getVersesById',
  async ({ id, words, author, translations, page }, { rejectWithValue }) => {
    try {
      const response = await baseQuranService.get<VersesResponse>(
        `/api/v1/quran/surah/${id}/verses?page=${page}`,
        {
          params: {
            id,
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
