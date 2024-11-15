import Image from 'next/image';
import {useRouter} from 'next/router';

import {PAGES} from '@/lib/helpers/Pages';
import {useNavigation} from '@/lib/hooks/useNavigation';
import {useAppSelector} from '@/lib/hooks/useStore';
import {RootState} from '@/lib/store';

export const Header = () => {
  const router = useRouter();
  const {previousQuestionIds} = useAppSelector(
    (state: RootState) => state.questionnaire
  );
  const previousQuestionId = [...previousQuestionIds].pop();
  const {handleBack} = useNavigation(previousQuestionId || 0);
  const questionPath = router.pathname.includes(PAGES.QUESTION);

  return (
    <header className="h-11 w-full bg-bg px-4 md:h-[54px]">
      <div className="relative flex h-full items-center justify-center">
        {previousQuestionIds.length > 0 && questionPath && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="absolute left-4 top-4"
          >
            <Image width={24} height={24} alt="Go Back" src="/chevron.svg" />
          </button>
        )}
        <Image width={24} height={24} alt="Logo" src="/logo.svg" />
      </div>
    </header>
  );
};
