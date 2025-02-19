import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.MainQuranState = {
  isLoading: false,
  user: null,
  users: [],
  authors: [],
  juzs: [],
  juzsBySurahsId: [],
  versesBySurahId: [],
  versesById: [],
  versesByPageNumber: [],
  verseAudio: [],
  reciters: [],
  surahByReciter: [],
  surahs: [],
  totalpages: 1,
  current_page: 1,
};

export const mainQuranSlice = createSlice({
  name: 'mainQuran',
  initialState,
  reducers,
  extraReducers,
});

export const quranActions = mainQuranSlice.actions;
export default mainQuranSlice.reducer;
