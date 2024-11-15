import {Open_Sans} from 'next/font/google';
import {useEffect} from 'react';

import {Header} from '@/components/UI/Header';
import {fetchQuestions} from '@/lib/api/question';
import {setFirstQuestionId} from '@/lib/features/questionnaire/questionnaireSlice';
import {useAppDispatch} from '@/lib/hooks/useStore';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
});

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
      <main className={`bg-bg py-5 font-sans ${openSans.variable}`}>
        {children}
      </main>
    </>
  );
};
