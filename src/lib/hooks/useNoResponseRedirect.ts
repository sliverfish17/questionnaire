import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {PAGES} from '@/lib/helpers/Pages';

export const useRedirectIfNoResponses = (
  firstQuestionId: number | null,
  responses: {[key: number]: {answerId: number | null; answerValue: string}}
) => {
  const router = useRouter();

  useEffect(() => {
    if (!Object.keys(responses).length && firstQuestionId) {
      router.replace(`${PAGES.QUESTION}/${firstQuestionId}`);
    }
  }, [firstQuestionId, responses]);
};
