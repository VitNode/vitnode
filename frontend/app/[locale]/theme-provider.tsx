'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Toaster } from '@/components/ui/toaster';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const searchParams = useSearchParams();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: !!searchParams.toString()
          }
        }
      })
  );

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
