import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalProvider from './api/context/GlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

const querClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={querClient}>
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
