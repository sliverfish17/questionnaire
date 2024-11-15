import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {Answer} from '@/components/Answer';
import {fetchQuestions, findQuestionById} from '@/lib/api/question';
import {PAGES} from '@/lib/helpers/Pages';
import withQuestionNavigation from '@/lib/hoc/withQuestionNavigation';
import {useQuestion} from '@/lib/hooks/useQuestion';
import {useAppSelector} from '@/lib/hooks/useStore';
import {QuestionPageProps} from '@/lib/types/Question';
import {parseTitle} from '@/lib/utils/parseTitle';

function QuestionPage({question}: QuestionPageProps) {
  const {handleAnswerClick, handleNext} = useQuestion(question);
  const {firstQuestionId, responses} = useAppSelector(
    state => state.questionnaire
  );
  const router = useRouter();

  useEffect(() => {
    if (!Object.keys(responses).length && firstQuestionId) {
      router.replace(`${PAGES.QUESTION}/${firstQuestionId}`);
    }
  }, [firstQuestionId, responses]);

  const parsedTitle = parseTitle(question.title, responses);

  return (
    <div className="mx-auto flex max-w-[330px] flex-col items-center justify-center">
      <h1 className="mb-[30px] text-2xl font-bold">{parsedTitle}</h1>
      <div className="grid gap-5">
        {question.screenType === 'question' &&
          question.answers &&
          question.answers.map(answer => (
            <Answer
              answer={answer}
              handleAnswerClick={handleAnswerClick}
              key={answer.id}
              questionId={question.id}
            />
          ))}
      </div>
      {question.screenType === 'info' && question.content && (
        <div className="space-y-4 text-center">
          <p>{question.content}</p>
          <button
            onClick={handleNext}
            className="mt-6 rounded-md bg-white px-6 py-2 text-gray-800 shadow-md hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default withQuestionNavigation(QuestionPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const questions = await fetchQuestions();
  const paths = questions.map(question => ({
    params: {id: question.id.toString()},
  }));
  return {paths, fallback: true};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const question = await findQuestionById(params?.id);

  if (!question) {
    return {notFound: true};
  }

  return {props: {question, questionId: question.id}};
};
