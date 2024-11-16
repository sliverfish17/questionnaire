import router from 'next/router';

import {setCurrentAndPrevQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';

import {useAppDispatch, useAppSelector} from './useStore';

export const useHandleInfo = (questionId: number, referenceId?: number) => {
  const {responses, previousQuestionIds} = useAppSelector(
    state => state.questionnaire
  );
  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (referenceId) {
      const referenceResponse = responses[referenceId];
      const referenceNextQuestionId = referenceResponse?.nextQuestionId;

      dispatch(
        setCurrentAndPrevQuestionId({
          currentQuestionId: referenceResponse.nextQuestionId,
          previousQuestionIds: [...previousQuestionIds, questionId],
        })
      );

      if (referenceNextQuestionId) {
        router.push(`${PAGES.QUESTION}/${referenceNextQuestionId}`);
      } else {
        router.push(`${PAGES.QUESTION}/${referenceId}`);
      }
    }
  };

  return handleNext;
};
