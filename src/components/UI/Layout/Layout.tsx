import {useEffect} from 'react';

import {Header} from '@/components/UI/Header';
import {fetchQuestions} from '@/lib/api/question';
import {setFirstQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {useAppDispatch} from '@/lib/hooks/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const questions = await fetchQuestions();
      const firstQuestionId = questions[0].id;
      dispatch(setFirstQuestionId(firstQuestionId));
    })();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="mt-5 bg-bg">{children}</main>
    </>
  );
};
