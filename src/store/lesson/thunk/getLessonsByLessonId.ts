import { createAsyncThunk } from '@reduxjs/toolkit';
import { LessonsByLessonId, LessonsByLessonIdResponse } from '../types';
import baseService from '../../../init/axios/baseService';

export const getLessonsByLessonId = createAsyncThunk<
  LessonsByLessonId[],
  number,
  { rejectValue: string }
>('lessons/getLessonsByLessonId', async (lessonId, { rejectWithValue }) => {
  try {
    const response = await baseService.get<LessonsByLessonIdResponse>(
      `api/v1/lesson/${lessonId}`
    );

    console.log('getLessonsByLessonId', response);
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
