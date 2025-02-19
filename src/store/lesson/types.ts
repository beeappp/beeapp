import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type LessonsState = {
  isLoading: boolean;
  lessons: Lessons[] | null;
  lessonsByCourseId: CourseData[] | null;
  lessonsByLessonId: LessonsByLessonId[] | null;
  transcript: string;
  is_correct: boolean | null;
};

// types.ts

export type Lessons = {
  id: number;
  course_id: number;
  file_path: string;
  file_type: string;
  text: string;
  position: number;
  published: boolean;
};

export type Timecode = {
  id: number;
  lesson_id: number;
  duration: string;
  speech_text: string;
  end_duration: string;
};

export type CourseData = {
  id: number;
  course_id: number;
  file_path: string;
  text: string;
  position: number;
  timecodes: Timecode[];
  description: string;
};

export type VideoData = {
  message: string;
  data: CourseData[];
};

export type GetLessonsResponse = {
  message: string;
  data: Lessons[];
};

export type LessonsByLessonIdResponse = {
  message: string;
  data: LessonsByLessonId[];
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string;
  published: boolean;
};

export type LessonsByLessonId = {
  id: number;
  course_id: number;
  file_path: string;
  file_type: string;
  text: string;
  position: number;
  published: boolean;
  course: Course;
  users: User[];
};

export type CheckLessonRequest = {
  resource_id: number;
  resource_type: 'lesson_timecodes' | 'questions' | 'lessons';
  audio_base_64: string;
  sample_rate: string;
};

export type CheckLessonResponseData = {
  transcript: string;
  result: boolean;
  id: number;
};

export type CheckLessonResponse = {
  message: string;
  data: CheckLessonResponseData;
};

export type CheckLessonState = {
  transcript: string | null;
  isCorrect: boolean | null;
  loading: boolean;
  error: string | null;
};

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<LessonsState, PayloadAction<T>>;
