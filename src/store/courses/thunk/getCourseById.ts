import { createAsyncThunk } from '@reduxjs/toolkit';
import { Course, GetCourseResponse, GetCoursesResponse } from '../types';
import baseService from '../../../init/axios/baseService';

export const getCourseById = createAsyncThunk<
  Course,
  number,
  { rejectValue: string }
>('courses/getCourses', async (courseId, { rejectWithValue }) => {
  try {
    const response = await baseService.get<GetCourseResponse>(
      `/api/v1/course/${courseId}`
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
