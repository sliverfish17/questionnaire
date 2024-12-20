import Head from 'next/head';
import {useRouter} from 'next/router';

import {Button} from '@/components/UI/Button';
import {useAppSelector} from '@/hooks/useStore';
import {PAGES} from '@/lib/helpers/Pages';

export default function HomePage() {
  const router = useRouter();
  const {firstQuestionId} = useAppSelector(state => state.questionnaire);

  const handleStart = () => {
    router.push(`${PAGES.QUESTION}/${firstQuestionId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-typography">
      <Head>
        <title>Super Quiz!</title>
        <meta property="og:title" content="Super Quiz!" key="title" />
        <meta
          name="description"
          content="Quiz meant to help with mental health"
        />
      </Head>
      <h1 className="text-center text-2xl font-bold">
        Welcome to the Questionnaire
      </h1>
      <p className="text-sm">
        Click &quot;Start&quot; to begin the questionnaire.
      </p>
      <Button onClick={handleStart}>Start</Button>
    </div>
  );
}
