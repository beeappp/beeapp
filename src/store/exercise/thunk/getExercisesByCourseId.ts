import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExercisesByCourse, GetExercisesByCourseResponse } from '../types';
import baseService from '../../../init/axios/baseService';

export const getExercisesByCourseId = createAsyncThunk<
  ExercisesByCourse[],
  number,
  { rejectValue: string }
>('exercises/getExercisesByCourseId', async (courseId, { rejectWithValue }) => {
  try {
    const response = await baseService.get<GetExercisesByCourseResponse>(
      `/api/v1/course/${courseId}/module-exercises`
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
