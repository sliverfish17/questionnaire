import Image from 'next/image';
import {useRouter} from 'next/router';

import {PAGES} from '@/lib/helpers/Pages';
import {useAppSelector} from '@/lib/hooks/useStore';
import {RootState} from '@/lib/store';

export const Header = () => {
  const router = useRouter();
  const {prevQuestionId} = useAppSelector(
    (state: RootState) => state.questionnaire
  );

  const handleBack = () => {
    router.push(`${PAGES.QUESTION}/${prevQuestionId}`);
  };

  return (
    <header className="h-11 w-full bg-bg px-4 md:h-[54px]">
      <div className="relative flex h-full items-center justify-center">
        {prevQuestionId && (
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
