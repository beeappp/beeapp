import { useAppDispatch, useAppSelector } from '..';
import { checkLesson } from './thunk/checkLesson';
import { getLessons } from './thunk/getLessons';
import { getLessonsByCourseId } from './thunk/getLessonsByCourseId';
import { getLessonsByLessonId } from './thunk/getLessonsByLessonId';
import { CheckLessonRequest } from './types';

export const useLessons = () => {
  const dispatch = useAppDispatch();

  return {
    getLessonsByCourseId: async (courseId: number) =>
      dispatch(getLessonsByCourseId(courseId)).unwrap(),
    getLessons: async () => dispatch(getLessons()).unwrap(),
    getLessonsByLessonId: async (lessonId: number) =>
      dispatch(getLessonsByLessonId(lessonId)).unwrap(),
    checkLesson: async (param: CheckLessonRequest) =>
      dispatch(checkLesson(param)).unwrap(),
    lessonsByCourseId: useAppSelector(({ lesson }) => lesson.lessonsByCourseId),
  };
};
