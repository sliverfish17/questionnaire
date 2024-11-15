import {useEffect} from 'react';

import {useAppDispatch} from '@/hooks/useStore';
import {setTheme} from '@/lib/features/questionnaire/questionnaireSlice';
import {SCREEN_TYPE} from '@/types/Question';
import {THEME} from '@/types/Theme';

export const useManageTheme = (screenType: SCREEN_TYPE) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = screenType === SCREEN_TYPE.INFO ? THEME.INFO : THEME.QUESTION;
    dispatch(setTheme(theme));
  }, [screenType, dispatch]);
};
