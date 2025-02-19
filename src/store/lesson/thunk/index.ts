import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { LessonsState } from '../types';
import { getLessons } from './getLessons';
import { getLessonsByCourseId } from './getLessonsByCourseId';
import { getLessonsByLessonId } from './getLessonsByLessonId';
import { checkLesson } from './checkLesson';

export const extraReducers = (
  builder: ActionReducerMapBuilder<LessonsState>
) => {
  builder.addMatcher(
    isAnyOf(
      getLessons.pending,
      getLessonsByCourseId.pending,
      getLessonsByLessonId.pending,
      checkLesson.pending
    ),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(getLessons.fulfilled), (state, action) => {
    state.isLoading = false;
    state.lessons = action.payload;
  });

  builder.addMatcher(
    isAnyOf(getLessonsByCourseId.fulfilled),
    (state, action) => {
      state.isLoading = false;
      state.lessonsByCourseId = action.payload;
    }
  );

  builder.addMatcher(
    isAnyOf(getLessonsByLessonId.fulfilled),
    (state, action) => {
      state.isLoading = false;
      state.lessonsByLessonId = action.payload;
    }
  );
  builder.addMatcher(isAnyOf(checkLesson.fulfilled), state => {
    state.isLoading = false;
    // state.is_correct = action.payload.is_correct;
    // state.transcript = action.payload.transcript;
  });

  builder.addMatcher(
    isAnyOf(
      getLessons.pending,
      getLessonsByCourseId.pending,
      getLessonsByLessonId.pending,
      checkLesson.pending
    ),
    state => {
      state.isLoading = false;
    }
  );
};
