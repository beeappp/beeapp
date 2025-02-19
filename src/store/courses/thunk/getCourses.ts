import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCoursesResponse } from '../types';
import baseService from '../../../init/axios/baseService';

export const getCourses = createAsyncThunk<
  GetCoursesResponse,
  number,
  { rejectValue: string }
>('courses/getCourses', async (page, { rejectWithValue }) => {
  try {
    const response = await baseService.get<GetCoursesResponse>(
      `/api/v1/course/module?page=${page}`
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
