import { createAsyncThunk } from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import { OnboardingByIdResponse, OnboardingStep } from '../types';

export const getOnboardingById = createAsyncThunk<
  OnboardingStep,
  number,
  { rejectValue: string }
>('onboarding/getOnboardingById', async (id, { rejectWithValue }) => {
  try {
    const response = await baseService.get<OnboardingByIdResponse>(
      `/api/v1/onboarding/${id}`
    );
    return response.data.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
