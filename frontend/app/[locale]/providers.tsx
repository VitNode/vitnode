"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { GlobalsContext } from "@/hooks/core/use-globals";
import type { ConfigType } from "@/config/get-config-file";
import type { Core_MiddlewareQuery } from "@/graphql/hooks";

interface Props {
  children: ReactNode;
  config: ConfigType;
  data?: Core_MiddlewareQuery;
}

export const Providers = ({ children, config, data }: Props) => {
  const [queryClient] = useState(
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
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <GlobalsContext.Provider
          value={{
            languages:
              data?.core_languages__show.edges.filter(lang => lang.enabled) ??
              [],
            defaultLanguage:
              data?.core_languages__show.edges.find(lang => lang.default)
                ?.code ?? "en",
            themes: data?.core_themes__show.edges ?? [],
            config,
            themeId: data?.core_settings__show.theme_id ?? 1
          }}
        >
          {children}
          <Toaster closeButton />
          {process.env.NEXT_PUBLIC_DEBUG && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </GlobalsContext.Provider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
