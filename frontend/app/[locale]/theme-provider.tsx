'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState } from 'react';

import { Toaster } from '@/components/ui/sonner';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <>
          {children}
          <Toaster position="bottom-center" closeButton />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
