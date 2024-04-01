import { createContext, useContext } from "react";

import type { ShowCoreLanguages, ShowCoreThemes } from "@/graphql/hooks";

interface Args {
  defaultLanguage: string;
  languages: Pick<
    ShowCoreLanguages,
    "code" | "default" | "enabled" | "locale" | "time_24" | "name" | "timezone"
  >[];
  themes: Pick<ShowCoreThemes, "id" | "name">[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: "",
  themes: []
});

export const useGlobals = (): Args => useContext(GlobalsContext);
