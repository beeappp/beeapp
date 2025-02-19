import { useAppDispatch, useAppSelector } from '..';
import { getExercisesByCourseId } from './thunk/getExercisesByCourseId';
import { getExercises } from './thunk/getExercises';
import { passExercise } from './thunk/passExercise';
import { CheckAudioExerciseRequest } from './types';
import { checkAudioExercise } from './thunk/checkAudioExercise';

export const useExercises = () => {
  const dispatch = useAppDispatch();

  return {
    getExercisesByCourseId: async (courseId: number) =>
      dispatch(getExercisesByCourseId(courseId)).unwrap(),
    getExercises: async () => dispatch(getExercises()).unwrap(),
    passExercise: async (id: number) => dispatch(passExercise(id)).unwrap(),
    checkAudioExercise: async (param: CheckAudioExerciseRequest) =>
      dispatch(checkAudioExercise(param)).unwrap(),
    exercises: useAppSelector(({ exercises }) => exercises.exercises),
    exercisesByCourse: useAppSelector(
      ({ exercises }) => exercises.exercisesByCourse
    ),
    isLoading: useAppSelector(({ exercises }) => exercises.isLoading),
  };
};
