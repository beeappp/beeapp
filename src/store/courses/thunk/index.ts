import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { CoursesState } from '../types';
import { getCourseById } from './getCourseById';
import { getCourses } from './getCourses';

export const extraReducers = (
  builder: ActionReducerMapBuilder<CoursesState>
) => {
  builder.addMatcher(
    isAnyOf(getCourses.pending, getCourseById.pending),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(getCourses.fulfilled), (state, action) => {
    state.courses = action.payload;
    state.isLoading = false;
  });

  builder.addMatcher(isAnyOf(getCourseById.fulfilled), (state, action) => {
    state.course = action.payload;
    state.isLoading = false;
  });

  builder.addMatcher(
    isAnyOf(getCourseById.rejected, getCourses.rejected),
    state => {
      state.isLoading = false;
    }
  );
};
