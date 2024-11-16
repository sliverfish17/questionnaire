import Image from 'next/image';
import {useRouter} from 'next/router';

import {ArrowIcon} from '@/components/UI/Icons';
import {useNavigation} from '@/hooks/useNavigation';
import {useAppSelector} from '@/hooks/useStore';
import {useTheme} from '@/hooks/useTheme';
import {PAGES} from '@/lib/helpers/Pages';
import {RootState} from '@/lib/store';

export const Header = () => {
  const router = useRouter();
  const {previousQuestionIds} = useAppSelector(
    (state: RootState) => state.questionnaire
  );
  const previousQuestionId = [...previousQuestionIds].pop();
  const {handleBack} = useNavigation(previousQuestionId || 0);
  const hadQuestionPath = router.pathname.includes(PAGES.QUESTION);
  const {arrowColor, logoPath} = useTheme();

  return (
    <header className="h-11 w-full bg-transparent px-4 md:h-[54px]">
      <div className="relative flex h-full items-center justify-center">
        {previousQuestionIds.length > 0 && hadQuestionPath && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="absolute left-4 top-4"
          >
            <ArrowIcon fill={arrowColor} />
          </button>
        )}
        <Image width={24} height={24} alt="Logo" src={logoPath} />
      </div>
    </header>
  );
};
