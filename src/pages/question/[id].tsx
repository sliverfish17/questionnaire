import {GetStaticPaths, GetStaticProps} from 'next';

import {Answer} from '@/components/Answer';
import {Info} from '@/components/Info';
import {fetchQuestions, findQuestionById} from '@/lib/api/question';
import withQuestionNavigation from '@/lib/hoc/withQuestionNavigation';
import {useRedirectIfNoResponses} from '@/lib/hooks/useNoResponseRedirect';
import {useQuestion} from '@/lib/hooks/useQuestion';
import {useAppSelector} from '@/lib/hooks/useStore';
import {QuestionPageProps, SCREEN_TYPE} from '@/lib/types/Question';
import {parseTitle} from '@/lib/utils/parseTitle';

function QuestionPage({question}: QuestionPageProps) {
  const {handleAnswerClick} = useQuestion(question);
  const {firstQuestionId, responses} = useAppSelector(
    state => state.questionnaire
  );
  useRedirectIfNoResponses(firstQuestionId, responses);

  const parsedTitle = parseTitle(question.title, responses);

  return (
    <div className="mx-auto flex max-w-[330px] flex-col items-center justify-center">
      <h1
        className={`text-typography mb-[30px] text-2xl font-bold ${question.description ? 'text-center' : 'text-left'}`}
      >
        {parsedTitle}
      </h1>
      {question.description && (
        <p className="text-typography mb-[30px] text-center text-lg font-bold">
          {question.description}
        </p>
      )}
      <div className="grid gap-5">
        {question.screenType === SCREEN_TYPE.QUESTION &&
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
      {question.screenType === SCREEN_TYPE.INFO && question.content && (
        <Info
          questionId={question.id}
          referenceId={question.referenceId}
          content={question.content}
        />
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
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const questionId = params?.id;
  if (!questionId || isNaN(Number(questionId))) {
    return {notFound: true};
  }

  const question = await findQuestionById(questionId);

  if (!question) {
    return {notFound: true};
  }

  return {
    props: {question, questionId: question.id},
  };
};
