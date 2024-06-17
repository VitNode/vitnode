"use client";

import * as React from "react";

import { Admin__Sessions__AuthorizationQuery } from "@/graphql/hooks";
import { SessionAdminContext } from "@/plugins/admin/hooks/use-session-admin";

interface Props {
  children: React.ReactNode;
  data: Admin__Sessions__AuthorizationQuery;
}

export const Providers = ({
  children,
  data: {
    admin__sessions__authorization: { user: session, version }
  }
}: Props) => {
  return (
    <SessionAdminContext.Provider
      value={{
        session,
        version
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
