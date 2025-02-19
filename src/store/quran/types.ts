import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type QuranState = {
  isLoading: boolean;
  translation: boolean;
  translText: boolean;
  ruText: boolean;
  kzText: boolean;
  arabText: boolean;
};

// types.ts

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<QuranState, PayloadAction<T>>;
