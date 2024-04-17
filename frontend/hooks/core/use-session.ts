import { createContext, useContext } from "react";

import type { AuthorizationCurrentUserObj, ShowCoreNav } from "@/graphql/hooks";

interface Args {
  nav: ShowCoreNav[];
  session: Omit<AuthorizationCurrentUserObj, "posts"> | undefined | null;
}

export const SessionContext = createContext<Args>({
  session: null,
  nav: []
});

export const useSession = () => useContext(SessionContext);
