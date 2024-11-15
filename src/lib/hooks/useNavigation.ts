import {useRouter} from 'next/router';
import {useCallback} from 'react';

import {setBackNavigation} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';
import {Question} from '@/lib/types/Question';

import {useAppDispatch} from './useStore';

export const useNavigation = (questionId: Question['id']) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBack = useCallback(() => {
    dispatch(setBackNavigation());
    router.push(`${PAGES.QUESTION}/${questionId}`);
  }, [dispatch, questionId, router]);

  return {
    handleBack,
  };
};
