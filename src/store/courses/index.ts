import { useAppDispatch, useAppSelector } from '..';
// import { coursesActions } from './slice';
import { getCourseById } from './thunk/getCourseById';
import { getCourses } from './thunk/getCourses';

export const useCourses = () => {
  const dispatch = useAppDispatch();

  return {
    getCourses: async (page: number) => dispatch(getCourses(page)).unwrap(),
    getCourseById: async (courseId: number) =>
      dispatch(getCourseById(courseId)).unwrap(),
    courses: useAppSelector(({ courses }) => courses.courses),
  };
};
