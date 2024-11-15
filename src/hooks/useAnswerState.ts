import {useAppSelector} from './useStore';

export const useAnswerState = (questionId: number, answerId: number) => {
  const savedAnswerId = useAppSelector(
    state => state.questionnaire.responses[questionId]?.answerId
  );

  return savedAnswerId === answerId;
};
