import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type CoursesState = {
  isLoading: boolean;
  courses: GetCoursesResponse | null;
  course: Course | [];
};

// types.ts
export type Course = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  published: boolean;
  image_type: null | any;
  image_path: string;
  color: string;
  module_id: null | any;
};

export type GetCoursesResponse = {
  current_page: number;
  data: Course[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

export type GetCourseResponse = {
  message: string;
  data: Course;
};

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export type TLanguage = { [key: string]: string };
// Contracts
export type BaseContract<T = any> = CaseReducer<CoursesState, PayloadAction<T>>;
