import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type OnboardingState = {
  isLoading: boolean;
  onboarding: OnboardingStep[] | null;
  onboardingById: OnboardingStep | null;
};

// types.ts
export type OnboardingStep = {
  id: number;
  step: number;
  file_path: string;
  file_type: string;
  content: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OnboardingResponse = {
  message: string;
  data: OnboardingStep[];
};

export type OnboardingByIdResponse = {
  message: string;
  data: OnboardingStep;
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<
  OnboardingState,
  PayloadAction<T>
>;
