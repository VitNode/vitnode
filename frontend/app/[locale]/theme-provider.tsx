'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState } from 'react';

import { SessionProvider } from './session-provider';
import { Authorization_Core_SessionsQuery } from '@/graphql/hooks';

interface Props extends ThemeProviderProps {
  initialDataSession?: Authorization_Core_SessionsQuery;
}

export const ThemeProvider = ({ children, initialDataSession, ...props }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider initialDataSession={initialDataSession}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
