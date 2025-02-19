import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type ExercisesState = {
  isLoading: boolean;
  exercises: Exercises[] | null;
  exercisesByCourse: ExercisesByCourse[] | null;
  transcript: string;
  is_correct: boolean | null;
};

// types.ts
export type Option = {
  id: number;
  question_id: number;
  arabic_text: string;
  simple_text: string;
};

export type Question = {
  id: number;
  type: number;
  question_text: string;
  file_path: string;
  score: number;
  options: Option[];
};

export type ExercisesByCourse = {
  id: number;
  course_id: number;
  question_id: number;
  position: number;
  published: boolean;
  question: Question;
};

export type Exercises = {
  id: number;
  course_id: number;
  question_id: number;
  position: number;
  published: boolean;
};

export type GetExercisesByCourseResponse = {
  message: string;
  data: ExercisesByCourse[];
};

export type GetExercisesResponse = {
  message: string;
  data: Exercises[];
};

export type CheckAudioExerciseRequest = {
  recourse_id: number;
  recourse_type: 'lessons' | 'questions';
  audio_base_64: string;
  sample_rate: string;
};
export type CheckAudioResponseData = {
  transcript: string;
  is_correct: boolean;
};

export type CheckAudioExerciseResponse = {
  message: string;
  data: CheckAudioResponseData;
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<
  ExercisesState,
  PayloadAction<T>
>;
