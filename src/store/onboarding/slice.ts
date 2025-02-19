import * as types from './types';
import { createSlice } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import { extraReducers } from './thunk';

const initialState: types.OnboardingState = {
  isLoading: false,
  onboarding: [],
  onboardingById: null,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers,
  extraReducers,
});

export const onboardingActions = onboardingSlice.actions;
export default onboardingSlice.reducer;
