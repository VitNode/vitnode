import * as React from "react";

import { AuthorizationCurrentUserObj } from "@/utils/graphql/hooks";

interface Args {
  session: Omit<AuthorizationCurrentUserObj, "posts"> | null | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: ""
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
