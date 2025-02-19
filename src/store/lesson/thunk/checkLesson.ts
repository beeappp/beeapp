import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {
  CheckLessonRequest,
  CheckLessonResponse,
  CheckLessonResponseData,
} from '../types';

export const checkLesson = createAsyncThunk<
  CheckLessonResponseData,
  CheckLessonRequest
>('lessons/checkLesson', async (param, { rejectWithValue }) => {
  const { resource_id, resource_type, audio_base_64, sample_rate } = param;

  try {
    const response = await baseService.post<CheckLessonResponse>(
      '/api/v1/pronunciation/check',
      {
        resource_id,
        resource_type,
        audio_base_64,
        sample_rate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response', response);
    return response.data.data;
  } catch (err: any) {
    console.log('err', err);
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
