import '../styles/globals.css';

import {AppProps} from 'next/app';
import {Provider} from 'react-redux';

import {Layout} from '@/components/UI/Layout';
import {store} from '@/lib/store';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
