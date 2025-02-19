import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.ExercisesState = {
  isLoading: false,
  exercises: [],
  exercisesByCourse: [],
  transcript: '',
  is_correct: null,
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers,
  extraReducers,
});

export const exercisesActions = exercisesSlice.actions;
export default exercisesSlice.reducer;
