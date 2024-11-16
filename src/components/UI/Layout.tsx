import {Open_Sans} from 'next/font/google';
import Head from 'next/head';

import {Header} from '@/components/UI/Header';
import {useSetIntitialQuestion} from '@/hooks/useSetInitialQuestion';
import {useTheme} from '@/hooks/useTheme';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
});

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  useSetIntitialQuestion();
  const {layout} = useTheme();

  return (
    <div className={`${layout} min-h-screen`}>
      <Head>
        <meta
          name="viewport"
          content="width=375,initial-scale=1,minimum-scale=0.5,maximum-scale=5,user-scalable=yes"
        />
      </Head>
      <Header />
      <main className={`py-5 font-sans ${openSans.variable}`}>{children}</main>
    </div>
  );
};
