import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { getUsers } from './getUsers';
import { getAuthors } from './getAuthors';
import { loginUser } from './loginUser';
import { registerUser } from './registerUser';
import { getJuzs } from './getJuzs';
import { getJuzsBySurahsId } from './getJuzsBySurahsId';
import { getVersesBySurahId } from './getVersesBySurahId';
import { getVersesById } from './getVersesById';
import { getVerseAudio } from './getVerseAudio';
import { getVersesByPageNumber } from './getVersesByPageNumber';
import { getReciters } from './getReciters';
import { getSurahByReciter } from './getSurahByReciter';
import { getSurahs } from './getSurahs';
import { getVersesByJuzs } from './getVersesByJuzs';

export const extraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder.addMatcher(
    isAnyOf(
      getUsers.pending,
      getAuthors.pending,
      loginUser.pending,
      registerUser.pending,
      getJuzs.pending,
      getJuzsBySurahsId.pending,
      getVersesBySurahId.pending,
      getVersesById.pending,
      getVerseAudio.pending,
      getVersesByPageNumber.pending,
      getReciters.pending,
      getSurahByReciter.pending,
      getSurahs.pending,
      getVersesByJuzs.pending
    ),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(loginUser.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(registerUser.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getUsers.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getAuthors.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getJuzs.fulfilled), (state, action) => {
    state.isLoading = false;
    state.juzs = action.payload.data;
  });

  builder.addMatcher(isAnyOf(getJuzsBySurahsId.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getVersesBySurahId.fulfilled), (state, action) => {
    state.isLoading = false;
    state.versesBySurahId = action.payload.data;
  });
  builder.addMatcher(isAnyOf(getVersesById.fulfilled), (state, action) => {
    state.isLoading = false;
    // state.versesById = action.payload.data;
    state.totalpages = action.payload.last_page;
    state.current_page = action.payload.current_page;
  });
  builder.addMatcher(isAnyOf(getVersesByJuzs.fulfilled), (state, action) => {
    state.isLoading = false;
    // state.versesById = action.payload.data;
    state.totalpages = action.payload.last_page;
    state.current_page = action.payload.current_page;
  });
  builder.addMatcher(isAnyOf(getVerseAudio.fulfilled), (state, action) => {
    state.isLoading = false;
  });
  builder.addMatcher(
    isAnyOf(getVersesByPageNumber.fulfilled),
    (state, action) => {
      state.isLoading = false;
    }
  );

  builder.addMatcher(isAnyOf(getReciters.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getSurahByReciter.fulfilled), (state, action) => {
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getSurahs.fulfilled), (state, action) => {
    state.isLoading = false;
    state.surahs = action.payload.data;
  });

  builder.addMatcher(
    isAnyOf(
      getUsers.rejected,
      getAuthors.rejected,
      loginUser.rejected,
      registerUser.rejected,
      getJuzs.rejected,
      getJuzsBySurahsId.rejected,
      getVersesBySurahId.rejected,
      getVersesById.rejected,
      getVerseAudio.rejected,
      getVersesByPageNumber.rejected,
      getReciters.rejected,
      getSurahByReciter.rejected,
      getSurahs.rejected,
      getVersesByJuzs.rejected
    ),
    state => {
      state.isLoading = false;
    }
  );
};
