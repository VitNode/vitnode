"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigType } from "vitnode-shared";

import { GlobalsContext } from "../../hooks/use-globals";
import { Toaster } from "../../components/ui/sonner";
import { Core_MiddlewareQuery } from "../../graphql/hooks";

interface Props {
  children: React.ReactNode;
  config: ConfigType;
  middlewareData?: Core_MiddlewareQuery;
}

export const RootProviders = ({ children, middlewareData, config }: Props) => {
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
            )?.code ?? "en",
          config,
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
