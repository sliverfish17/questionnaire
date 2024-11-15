import {useRouter} from 'next/router';
import {ComponentType, useEffect} from 'react';

import {setCurrentAndPrevQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';
import {useAppDispatch, useAppSelector} from '@/lib/hooks/useStore';
import {QuestionPageProps} from '@/lib/types/Question';

function withQuestionNavigation<P extends QuestionPageProps>(
  WrappedComponent: ComponentType<P>
) {
  const ComponentWithNavigation = (props: P) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {currentQuestionId, prevQuestionId} = useAppSelector(
      state => state.questionnaire
    );

    useEffect(() => {
      const handlePopState = () => {
        const questionId = parseInt(router.query.id as string, 10);
        if (!isNaN(questionId)) {
          dispatch(
            setCurrentAndPrevQuestionId({
              currentQuestionId: questionId,
              prevQuestionId: prevQuestionId,
            })
          );
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [dispatch, prevQuestionId, router.query.id]);

    useEffect(() => {
      if (
        currentQuestionId !== null &&
        props.question.id !== currentQuestionId &&
        props.question.id !== prevQuestionId
      ) {
        router.replace(`${PAGES.QUESTION}/${currentQuestionId}`);
      }
    }, [currentQuestionId, prevQuestionId, props.question.id, router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithNavigation;
}

export default withQuestionNavigation;
