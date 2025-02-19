import { createAsyncThunk } from '@reduxjs/toolkit';
import baseQuranService from '../../../init/axios/baseQuranService';
import { VersesAudioRequest } from '../types';

export const getVerseAudio = createAsyncThunk<
  any,
  VersesAudioRequest,
  { rejectValue: string }
>('verses/getVerseAudio', async ({ verse_id, words }, { rejectWithValue }) => {
  try {
    const response = await baseQuranService.get<any>(`/api/v1/quran/audio`, {
      params: {
        verse_id,
        words,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
