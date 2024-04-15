import { createContext, useContext } from "react";

import type {
  AuthorizationCurrentUserObj,
  RebuildRequiredObj,
  ShowCoreNav
} from "@/graphql/hooks";

interface Args {
  nav: ShowCoreNav[];
  rebuild_required: RebuildRequiredObj;
  session: Omit<AuthorizationCurrentUserObj, "posts"> | undefined | null;
}

export const SessionContext = createContext<Args>({
  session: null,
  nav: [],
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  }
});

export const useSession = () => useContext(SessionContext);
