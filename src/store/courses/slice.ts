import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.CoursesState = {
  isLoading: false,
  courses: null,
  course: [],
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers,
  extraReducers,
});

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
