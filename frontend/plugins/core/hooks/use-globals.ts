import * as React from "react";

import { ShowCoreLanguages } from "@/graphql/hooks";
import { ConfigType } from "@/config";

interface Args {
  config: ConfigType;
  defaultLanguage: string;
  languages: Pick<
    ShowCoreLanguages,
    | "allow_in_input"
    | "code"
    | "default"
    | "enabled"
    | "locale"
    | "name"
    | "time_24"
    | "timezone"
  >[];
}

export const GlobalsContext = React.createContext<Args>({
  languages: [],
  defaultLanguage: "",
  config: {} as ConfigType
});

export const useGlobals = () => React.useContext(GlobalsContext);
