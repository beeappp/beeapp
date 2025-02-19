import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.LessonsState = {
  isLoading: false,
  lessons: [],
  lessonsByCourseId: [],
  lessonsByLessonId: [],
  transcript: '',
  is_correct: null,
};

export const lessonsSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers,
  extraReducers,
});

export const lessonsActions = lessonsSlice.actions;
export default lessonsSlice.reducer;
