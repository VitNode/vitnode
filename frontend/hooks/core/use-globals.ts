import { createContext, useContext } from "react";

import type { ShowCoreLanguages, ShowCoreThemes } from "@/graphql/hooks";

interface Args {
  defaultLanguage: string;
  languages: Omit<ShowCoreLanguages, "protected">[];
  themes: Pick<ShowCoreThemes, "id" | "name">[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: "",
  themes: []
});

export const useGlobals = () => useContext(GlobalsContext);
