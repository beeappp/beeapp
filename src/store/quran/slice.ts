import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.QuranState = {
  isLoading: false,
  translation: false,
  translText: true,
  ruText: true,
  kzText: true,
  arabText: true,
};

export const quranSlice = createSlice({
  name: 'quran',
  initialState,
  reducers,
  extraReducers,
});

export const quranActions = quranSlice.actions;
export default quranSlice.reducer;
