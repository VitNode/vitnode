"use client";

import type { ReactNode } from "react";

import { SessionContext } from "@/hooks/core/use-session";
import type { Core_Sessions__AuthorizationQuery } from "@/graphql/hooks";

interface Props {
  children: ReactNode;
  data: Core_Sessions__AuthorizationQuery;
}

export const SessionProvider = ({ children, data }: Props): JSX.Element => {
  return (
    <SessionContext.Provider
      value={{
        session: data?.core_sessions__authorization.user,
        theme_id: data?.core_sessions__authorization.theme_id ?? null,
        nav: data?.core_nav__show.edges ?? [],
        rebuild_required: data?.core_sessions__authorization.rebuild_required
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
