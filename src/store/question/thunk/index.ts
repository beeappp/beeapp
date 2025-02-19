import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { QuestionState } from '../types';
import { answerQuestion } from './answerQuestion';

export const extraReducers = (
  builder: ActionReducerMapBuilder<QuestionState>
) => {
  builder.addMatcher(isAnyOf(answerQuestion.pending), state => {
    state.isLoading = true;
  });

  builder.addMatcher(isAnyOf(answerQuestion.fulfilled), (state, action) => {
    state.isLoading = false;
    state.question = action.payload;
  });

  builder.addMatcher(isAnyOf(answerQuestion.rejected), state => {
    state.isLoading = false;
  });
};
