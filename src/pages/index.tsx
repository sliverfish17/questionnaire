'use client';
import {useRouter} from 'next/router';

import {PAGES} from '@/lib/helpers/Pages';
import {useAppSelector} from '@/lib/hooks/useStore';

export default function HomePage() {
  const router = useRouter();
  const {firstQuestionId} = useAppSelector(state => state.questionnaire);

  const handleStart = () => {
    router.push(`${PAGES.QUESTION}/${firstQuestionId}`);
  };

  return (
    <div>
      <h1>Welcome to the Questionnaire</h1>
      <p>Click &quot;Start&quot; to begin the questionnaire.</p>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
