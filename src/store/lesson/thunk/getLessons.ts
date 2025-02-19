import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import { GetLessonsResponse, Lessons } from '../types';

export const getLessons = createAsyncThunk<
  Lessons[],
  void,
  { rejectValue: string }
>('lessons/getLessons', async (_, { rejectWithValue }) => {
  try {
    const response = await baseService.get<GetLessonsResponse>(
      '/api/v1/lesson'
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
