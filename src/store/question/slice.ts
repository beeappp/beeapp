import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.QuestionState = {
  isLoading: false,
  question: [],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers,
  extraReducers,
});

export const questionActions = questionSlice.actions;
export default questionSlice.reducer;
