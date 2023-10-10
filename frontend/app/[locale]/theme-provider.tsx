'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState } from 'react';
import { Toaster } from 'sonner';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          toastOptions={{
            duration: 5000000
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
