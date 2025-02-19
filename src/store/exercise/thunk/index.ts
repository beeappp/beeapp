import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { ExercisesState } from '../types';
import { getExercises } from './getExercises';
import { getExercisesByCourseId } from './getExercisesByCourseId';
import { passExercise } from './passExercise';
import { checkAudioExercise } from './checkAudioExercise';

export const extraReducers = (
  builder: ActionReducerMapBuilder<ExercisesState>
) => {
  builder.addMatcher(
    isAnyOf(
      getExercises.pending,
      getExercisesByCourseId.pending,
      passExercise.pending,
      checkAudioExercise.pending
    ),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(getExercises.fulfilled), (state, action) => {
    state.isLoading = false;
    state.exercises = action.payload;
  });

  builder.addMatcher(
    isAnyOf(getExercisesByCourseId.fulfilled),
    (state, action) => {
      state.isLoading = false;
      state.exercisesByCourse = action.payload;
    }
  );

  builder.addMatcher(isAnyOf(passExercise.fulfilled), state => {
    state.isLoading = false;
    // state.passExercise = action.payload;
  });

  builder.addMatcher(isAnyOf(checkAudioExercise.fulfilled), state => {
    state.isLoading = false;
    // state.is_correct = action.payload.data.is_correct;
    // state.transcript = action.payload.data.transcript;
  });

  builder.addMatcher(
    isAnyOf(
      getExercisesByCourseId.rejected,
      getExercises.rejected,
      passExercise.rejected,
      checkAudioExercise.rejected
    ),
    state => {
      state.isLoading = false;
    }
  );
};
