import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Root } from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store';
import { api, setupInterceptors } from './api/axios';
import { logOut, refreshToken } from './redux/userSlice';

export const queryClient = new QueryClient();

setupInterceptors(store, api, refreshToken, logOut);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Root />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
