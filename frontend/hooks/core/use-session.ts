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
  theme_id: number | null;
}

export const SessionContext = createContext<Args>({
  session: null,
  theme_id: null,
  nav: [],
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  }
});

export const useSession = () => useContext(SessionContext);
