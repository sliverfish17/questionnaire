import React from 'react';

import {Button} from '@/components/UI/Button';
import {useAnswerState} from '@/hooks/useAnswerState';
import {Answer as IAnswer} from '@/types/Question';

interface AnswerProps {
  answer: IAnswer;
  handleAnswerClick: (answer: IAnswer) => void;
  questionId: number;
}

export const Answer = ({
  answer,
  handleAnswerClick,
  questionId,
}: AnswerProps) => {
  const isActive = useAnswerState(questionId, answer.id);

  return (
    <Button onClick={() => handleAnswerClick(answer)} isActive={isActive}>
      {answer.text}
    </Button>
  );
};
