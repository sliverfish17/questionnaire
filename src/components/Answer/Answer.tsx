import React from 'react';

import {Button} from '@/components/UI/Button';
import {Answer as IAnswer} from '@/lib/types/Question';

export const Answer = ({
  answer,
  handleAnswerClick,
}: {
  answer: IAnswer;
  handleAnswerClick: (answer: IAnswer) => void;
}) => {
  return (
    <Button onClick={() => handleAnswerClick(answer)}>{answer.text}</Button>
  );
};
