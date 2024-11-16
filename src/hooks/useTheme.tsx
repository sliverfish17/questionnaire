import {useAppSelector} from '@/hooks/useStore';
import {THEME} from '@/types/Theme';

export const useTheme = () => {
  const {theme} = useAppSelector(state => state.questionnaire);

  switch (theme) {
    case THEME.INFO:
      return {
        logoPath: '/images/logo-white.png',
        arrowColor: '#FAFAFA',
        title: '#FBFBFF',
        layout: 'bg-active-gradient text-info',
      };
    case THEME.QUESTION:
      return {
        logoPath: '/images/logo-black.png',
        arrowColor: '#333333',
        title: '#201F1F',
        layout: 'bg-bg text-question',
      };
    default:
      return {
        logoPath: '/images/logo-black.png',
        arrowColor: '#333333',
        title: '#201F1F',
        layout: 'bg-bg text-question',
      };
  }
};
