import { createAsyncThunk } from '@reduxjs/toolkit';
import { CourseData, VideoData } from '../types';
import baseService from '../../../init/axios/baseService';

export const getLessonsByCourseId = createAsyncThunk<
  CourseData[],
  number,
  { rejectValue: string }
>('lessons/getLessonsByCourseId', async (courseId, { rejectWithValue }) => {
  try {
    const response = await baseService.get<VideoData>(
      `api/v1/course/${courseId}/module-lessons?include=timecodes`
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
