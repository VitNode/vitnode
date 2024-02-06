import { createContext, useContext } from "react";

import type {
  LanguageCoreMiddlewareObj,
  ShowCoreThemes
} from "@/graphql/hooks";

interface Args {
  defaultLanguage: string;
  languages: Omit<LanguageCoreMiddlewareObj, "protected">[];
  themes: Pick<ShowCoreThemes, "id" | "name">[];
}

export const GlobalsContext = createContext<Args>({
  languages: [],
  defaultLanguage: "",
  themes: []
});

export const useGlobals = () => useContext(GlobalsContext);
