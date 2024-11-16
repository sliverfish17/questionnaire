import {useEffect} from 'react';

import {useAppDispatch} from '@/hooks/useStore';
import {fetchQuestions} from '@/lib/api/question';
import {setFirstQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';

export const useSetIntitialQuestion = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeFirstQuestion = async () => {
      const questions = await fetchQuestions();
      const [firstQuestion] = questions;
      dispatch(setFirstQuestionId(firstQuestion.id));
    };

    initializeFirstQuestion();
  }, [dispatch]);
};
