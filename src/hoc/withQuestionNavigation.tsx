import {useRouter} from 'next/router';
import {ComponentType, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {setCurrentAndPrevQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {PAGES} from '@/lib/helpers/Pages';
import {QuestionPageProps} from '@/types/Question';

function withQuestionNavigation<P extends QuestionPageProps>(
  WrappedComponent: ComponentType<P>
) {
  const ComponentWithNavigation = (props: P) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {currentQuestionId, previousQuestionIds, responses} = useAppSelector(
      state => state.questionnaire
    );

    useEffect(() => {
      const handlePopState = () => {
        const questionId = parseInt(router.query.id as string, 10);
        if (!isNaN(questionId)) {
          dispatch(
            setCurrentAndPrevQuestionId({
              currentQuestionId: questionId,
              previousQuestionIds: previousQuestionIds,
            })
          );
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [dispatch, previousQuestionIds, router.query.id]);

    useEffect(() => {
      if (props.question.infoPageId) {
        const referenceResponse = responses[props.question.infoPageId];
        const referenceNextQuestionId = referenceResponse?.nextQuestionId;

        if (referenceNextQuestionId) {
          router.replace(`${PAGES.QUESTION}/${referenceNextQuestionId}`);
          return;
        }
      }
    }, [
      currentQuestionId,
      previousQuestionIds,
      props.question.id,
      props.question.infoPageId,
      responses,
      router,
    ]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithNavigation;
}

export default withQuestionNavigation;
