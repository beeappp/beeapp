import { useAppDispatch } from '..';
import { answerQuestion } from './thunk/answerQuestion';
import { QuestionRequest } from './types';

export const useQuestion = () => {
  const dispatch = useAppDispatch();

  return {
    answerQuestion: async (param: QuestionRequest) =>
      dispatch(answerQuestion(param)).unwrap(),
  };
};
