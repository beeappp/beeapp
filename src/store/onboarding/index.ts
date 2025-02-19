import { useAppDispatch } from '..';
import { getOnboarding } from './thunk/getOnboarding';
import { getOnboardingById } from './thunk/getOnboardingById';

export const useOnboard = () => {
  const dispatch = useAppDispatch();

  return {
    getExercisesByCourseId: async (id: number) =>
      dispatch(getOnboardingById(id)).unwrap(),
    getExercises: async () => dispatch(getOnboarding()).unwrap(),
  };
};
