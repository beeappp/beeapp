import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import { Exercises, GetExercisesResponse } from '../types';

export const getExercises = createAsyncThunk<
  Exercises[],
  void,
  { rejectValue: string }
>('exercises/getExercises', async (_, { rejectWithValue }) => {
  try {
    const response = await baseService.get<GetExercisesResponse>(
      '/api/v1/exercise'
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
