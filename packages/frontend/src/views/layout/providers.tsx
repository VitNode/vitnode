"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigType } from "@vitnode/shared";

import { GlobalsContext } from "../../hooks/use-globals";
import { Toaster } from "../../components/ui/sonner";

export interface MiddlewareData {
  core_languages__show: {
    edges: {
      allow_in_input: boolean;
      code: string;
      default: boolean;
      enabled: boolean;
      id: number;
      locale: string;
      name: string;
      time_24: boolean;
      timezone: string;
    }[];
  };
  core_plugins__show: { code: string }[];
  core_settings__show: {
    site_copyright: {
      language_code: string;
      value: string;
    }[];
    site_description: {
      language_code: string;
      value: string;
    }[];
    site_name: string;
  };
}

interface Props {
  children: React.ReactNode;
  config: ConfigType;
  middlewareData?: MiddlewareData;
}

export const Providers = ({ children, middlewareData, config }: Props) => {
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
