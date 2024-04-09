import { createContext, useContext } from "react";

import type { ShowCoreLanguages, ShowCoreThemes } from "@/graphql/hooks";
import type { ConfigType } from "@/config/get-config-file";

interface Args {
  config: ConfigType;
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
  themes: [],
  config: {
    rebuild_required: {
      langs: false,
      plugins: false,
      themes: false
    },
    editor: {
      sticky: false
    },
    settings: {
      general: {
        side_name: ""
      }
    }
  }
});

export const useGlobals = () => useContext(GlobalsContext);
