import {useEffect} from 'react';

import {useAppDispatch} from '@/hooks/useStore';
import {fetchQuestions} from '@/lib/api/question';
import {setFirstQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';

export const useSetIntitialQuestion = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeFirstQuestion = async () => {
      const questions = await fetchQuestions();
      const firstQuestionId = questions[0].id;
      dispatch(setFirstQuestionId(firstQuestionId));
    };

    initializeFirstQuestion();
  }, [dispatch]);
};
