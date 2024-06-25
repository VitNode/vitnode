import { ConfigType } from "@vitnode/shared";
import * as React from "react";

import { MiddlewareData } from "../views/layout/providers";

interface Args {
  config: ConfigType;
  defaultLanguage: string;
  languages: MiddlewareData["core_languages__show"]["edges"];
}

export const GlobalsContext = React.createContext<Args>({
  languages: [],
  defaultLanguage: "",
  config: {} as ConfigType,
});

export const useGlobals = () => React.useContext(GlobalsContext);
