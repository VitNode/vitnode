"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import "../_supressLogs";

import { Toaster } from "@/components/ui/sonner";
import { GlobalsContext } from "@/hooks/core/use-globals";
import { Core_MiddlewareQuery } from "@/graphql/hooks";
import { ConfigType } from "@/config";

interface Props {
  children: React.ReactNode;
  config: ConfigType;
  data?: Core_MiddlewareQuery;
}

export const Providers = ({ children, config, data }: Props) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalsContext.Provider
        value={{
          languages:
            data?.core_languages__show.edges.filter(lang => lang.enabled) ?? [],
          defaultLanguage:
            data?.core_languages__show.edges.find(lang => lang.default)?.code ??
            "en",
          themes: data?.core_themes__show.edges ?? [],
          config,
          themeId: data?.core_settings__show.theme_id ?? 1
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
        {process.env.NEXT_PUBLIC_DEBUG && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </GlobalsContext.Provider>
    </QueryClientProvider>
  );
};
