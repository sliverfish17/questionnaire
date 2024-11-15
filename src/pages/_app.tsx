import '../styles/globals.css';

import {AppProps} from 'next/app';
import {Open_Sans} from 'next/font/google';
import {Provider} from 'react-redux';

import {Layout} from '@/components/UI/Layout';
import {store} from '@/lib/store';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
});

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${openSans.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Provider>
  );
}
