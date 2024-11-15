import {useRouter} from 'next/router';
import React from 'react';

import {Button} from '@/components/UI/Button';
import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {setCurrentAndPrevQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';

interface InfoProps {
  content: string;
  referenceId?: number;
  questionId: number;
}

export const Info: React.FC<InfoProps> = ({
  content,
  referenceId,
  questionId,
}) => {
  const router = useRouter();
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
          currentQuestionId: referenceId,
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

  return (
    <div className="mx-auto flex max-w-[330px] flex-col items-center justify-center">
      <div className="space-y-4 text-center text-info">
        <p className="mb-10 font-sans">{content}</p>
        <Button
          onClick={handleNext}
          className="mt-6 rounded-md bg-white px-6 py-2 text-gray-800 shadow-md hover:bg-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
