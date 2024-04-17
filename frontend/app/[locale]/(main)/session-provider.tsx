"use client";

import type { ReactNode } from "react";

import { SessionContext } from "@/hooks/core/use-session";
import type { Core_Sessions__AuthorizationQuery } from "@/graphql/hooks";

interface Props {
  children: ReactNode;
  data: Core_Sessions__AuthorizationQuery;
}

export const SessionProvider = ({ children, data }: Props) => {
  return (
    <SessionContext.Provider
      value={{
        session: data?.core_sessions__authorization.user,
        nav: data?.core_nav__show.edges ?? []
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
