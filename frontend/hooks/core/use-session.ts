import { createContext, useContext } from "react";

import {
  AuthorizationCurrentUserObj,
  Core_Sessions__AuthorizationQuery,
  ShowCoreNav
} from "@/graphql/hooks";

interface Args {
  files: Core_Sessions__AuthorizationQuery["core_sessions__authorization"]["files"];
  nav: ShowCoreNav[];
  session: Omit<AuthorizationCurrentUserObj, "posts"> | null | undefined;
}

export const SessionContext = createContext<Args>({
  session: null,
  nav: [],
  files: {
    allow_upload: true,
    max_storage_for_submit: 10000,
    total_max_storage: 500000,
    space_used: 0
  }
});

export const useSession = () => useContext(SessionContext);
