import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { OnboardingState } from '../types';
import { getOnboarding } from './getOnboarding';
import { getOnboardingById } from './getOnboardingById';

export const extraReducers = (
  builder: ActionReducerMapBuilder<OnboardingState>
) => {
  builder.addMatcher(
    isAnyOf(getOnboarding.pending, getOnboardingById.pending),
    state => {
      state.isLoading = true;
    }
  );

  builder.addMatcher(isAnyOf(getOnboarding.fulfilled), (state, action) => {
    state.isLoading = false;
    state.onboarding = action.payload;
  });

  builder.addMatcher(isAnyOf(getOnboardingById.fulfilled), (state, action) => {
    state.isLoading = false;
    state.onboardingById = action.payload;
  });

  builder.addMatcher(
    isAnyOf(getOnboarding.rejected, getOnboardingById.rejected),
    state => {
      state.isLoading = false;
    }
  );
};
