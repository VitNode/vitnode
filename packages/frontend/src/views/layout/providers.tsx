'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GlobalsContext } from '../../hooks/use-globals';
import { Toaster } from '../../components/ui/sonner';
import { Core_GlobalQuery } from '../../graphql/graphql';

interface Props {
  children: React.ReactNode;
  middlewareData?: Core_GlobalQuery;
}

export const RootProviders = ({ children, middlewareData }: Props) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalsContext.Provider
        value={{
          languages:
            middlewareData?.core_languages__show.edges.filter(
              lang => lang.enabled,
            ) ?? [],
          defaultLanguage:
            middlewareData?.core_languages__show.edges.find(
              lang => lang.default,
            )?.code ?? 'en',
          settings: middlewareData?.core_settings__show ?? {
            site_copyright: [],
            site_description: [],
            site_name: '',
            site_short_name: '',
          },
          config:
            middlewareData?.core_middleware__show ??
            ({} as Core_GlobalQuery['core_middleware__show']),
        }}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster closeButton />
        </NextThemesProvider>
      </GlobalsContext.Provider>
    </QueryClientProvider>
  );
};
