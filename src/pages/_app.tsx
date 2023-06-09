import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalProvider from './api/context/GlobalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
