import {useRouter} from 'next/router';

import {Button} from '@/components/UI/Button';
import {PAGES} from '@/lib/helpers/Pages';
import {useAppSelector} from '@/lib/hooks/useStore';

export default function HomePage() {
  const router = useRouter();
  const {firstQuestionId} = useAppSelector(state => state.questionnaire);

  const handleStart = () => {
    router.push(`${PAGES.QUESTION}/${firstQuestionId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-typography">
      <h1 className="text-2xl font-bold ">Welcome to the Questionnaire</h1>
      <p className="text-sm">
        Click &quot;Start&quot; to begin the questionnaire.
      </p>
      <Button onClick={handleStart}>Start</Button>
    </div>
  );
}
