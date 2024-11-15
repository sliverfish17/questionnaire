import {useRouter} from 'next/router';
import {useCallback} from 'react';

import {answerQuestion} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';
import {Answer, Question} from '@/types/Question';

import {useAppDispatch} from './useStore';

export const useQuestion = (question: Question) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAnswerClick = useCallback(
    (answer: Answer) => {
      dispatch(
        answerQuestion({
          questionId: question.id,
          answerId: answer.id,
          answerValue: answer.text,
          nextQuestionId: answer.nextQuestionId,
        })
      );

      if (question.infoPageId) {
        router.push(`${PAGES.QUESTION}/${question.infoPageId}`);
        return;
      }

      if (answer.nextQuestionId) {
        router.push(`${PAGES.QUESTION}/${answer.nextQuestionId}`);
      } else {
        router.push(PAGES.RESULTS);
      }
    },
    [dispatch, question, router]
  );

  return {
    handleAnswerClick,
  };
};
