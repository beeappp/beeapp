import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import { OnboardingResponse, OnboardingStep } from '../types';

export const getOnboarding = createAsyncThunk<
  OnboardingStep[],
  void,
  { rejectValue: string }
>('onboarding/getOnboarding', async (_, { rejectWithValue }) => {
  try {
    const response = await baseService.get<OnboardingResponse>(
      '/api/v1/onboarding'
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
