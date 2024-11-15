import {Question, SCREEN_TYPE} from '@/lib/types/Question';

import {parseTitle} from './parseTitle';

type FormattedQuestion = Question & {
  answer: string;
};

export const parseQuestionsAndAnswers = (
  questions: Question[],
  previousQuestionIds: number[],
  responses: {[key: number]: {answerId: number | null; answerValue: string}}
): FormattedQuestion[] => {
  return previousQuestionIds.reduce<FormattedQuestion[]>((acc, id) => {
    const question = questions.find(q => q.id === id);

    if (question && question.screenType === SCREEN_TYPE.QUESTION) {
      const parsedTitle = parseTitle(question.title, responses);

      const selectedAnswer = question.answers?.find(
        answer => answer.id === responses[question.id]?.answerId
      );

      acc.push({
        ...question,
        title: parsedTitle,
        answer: selectedAnswer ? selectedAnswer.text : '',
      });
    }

    return acc;
  }, []);
};
