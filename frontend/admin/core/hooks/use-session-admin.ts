import * as React from "react";

import {
  AuthorizationCurrentUserObj,
  NavAdminPluginsAuthorization
} from "@/graphql/hooks";

interface Args {
  nav: NavAdminPluginsAuthorization[];
  session: Omit<AuthorizationCurrentUserObj, "posts"> | null | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: "",
  nav: []
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
