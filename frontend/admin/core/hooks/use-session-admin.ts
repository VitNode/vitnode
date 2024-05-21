import { createContext, useContext } from "react";

import type {
  AuthorizationCurrentUserObj,
  NavAdminPluginsAuthorization
} from "@/graphql/hooks";

interface Args {
  nav: NavAdminPluginsAuthorization[];
  session: Omit<AuthorizationCurrentUserObj, "posts"> | null | undefined;
  version: string;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  version: "",
  nav: []
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
