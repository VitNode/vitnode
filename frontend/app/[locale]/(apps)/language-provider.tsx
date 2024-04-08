"use client";

import type { ReactNode } from "react";

import type { Core_MiddlewareQuery } from "@/graphql/hooks";
import { GlobalsContext } from "@/hooks/core/use-globals";
import type { ConfigType } from "@/functions/get-config-file";

interface Props {
  children: ReactNode;
  config: ConfigType;
  data: Core_MiddlewareQuery | undefined;
}

export const LanguageProvider = ({ children, config, data }: Props) => {
  return (
    <GlobalsContext.Provider
      value={{
        languages:
          data?.core_languages__show.edges.filter(lang => lang.enabled) ?? [],
        defaultLanguage:
          data?.core_languages__show.edges.find(lang => lang.default)?.code ??
          "en",
        themes: data?.core_themes__show.edges ?? [],
        config
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};
