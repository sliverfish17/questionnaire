import {GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import React from 'react';

import {Response} from '@/components/Final';
import {Button} from '@/components/UI/Button';
import {useRedirectIfNoResponses} from '@/hooks/useNoResponseRedirect';
import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {fetchQuestions} from '@/lib/api/question';
import {resetQuiz} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';
import {Question} from '@/types/Question';
import {parseQuestionsAndAnswers} from '@/utils/parseQuestionsAndAnswers';

interface FinalPageProps {
  questions: Question[];
}

const Results = ({questions}: FinalPageProps) => {
  const {responses, previousQuestionIds, firstQuestionId} = useAppSelector(
    state => state.questionnaire
  );
  const dispatch = useAppDispatch();
  useRedirectIfNoResponses(firstQuestionId, responses);
  const router = useRouter();
  const parsedQuestions = parseQuestionsAndAnswers(
    questions,
    previousQuestionIds,
    responses
  );

  const restartQuiz = () => {
    router.push(PAGES.HOME);
    dispatch(resetQuiz());
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-10 text-center text-3xl font-bold">
        Final Questions Summary
      </h1>
      <ul className="mb-4 grid gap-4">
        {parsedQuestions.map(question => (
          <Response key={question.id} {...question} />
        ))}
      </ul>
      <Button onClick={restartQuiz} className="w-full">
        Restart Quiz
      </Button>
    </div>
  );
};

export default Results;

export const getStaticProps: GetStaticProps = async () => {
  const questions = await fetchQuestions();

  return {
    props: {
      questions,
    },
  };
};
