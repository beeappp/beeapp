import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type QuestionState = {
  isLoading: boolean;
  question: any | null;
};

// types.ts
export type QuestionRequest = {
  exercise_id: number;
  options: any[] | null;
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<
  QuestionState,
  PayloadAction<T>
>;
