import { createContext, useContext } from "react";

import type {
  AuthorizationCurrentUserObj,
  NavAdminPluginsAuthorization,
  RebuildRequiredObj
} from "@/graphql/hooks";

interface Args {
  nav: NavAdminPluginsAuthorization[];
  rebuild_required: RebuildRequiredObj;
  session: Omit<AuthorizationCurrentUserObj, "posts"> | undefined | null;
  version: string;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  },
  version: "",
  nav: []
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
