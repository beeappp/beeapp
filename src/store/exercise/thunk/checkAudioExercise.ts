import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {
  CheckAudioExerciseRequest,
  CheckAudioExerciseResponse,
} from '../types';

export const checkAudioExercise = createAsyncThunk<
  CheckAudioExerciseResponse,
  CheckAudioExerciseRequest
>('lessons/checkLesson', async (param, { rejectWithValue }) => {
  const { recourse_id, recourse_type, audio_base_64, sample_rate } = param;

  try {
    const response = await baseService.post<CheckAudioExerciseResponse>(
      '/api/v1/lesson/check',
      {
        recourse_id,
        recourse_type,
        audio_base_64,
        sample_rate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
});
