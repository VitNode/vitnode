'use client';

import * as React from 'react';
import { SessionContext } from 'vitnode-frontend/hooks/use-session';

import { Core_Sessions__AuthorizationQuery } from '@/graphql/hooks';

interface Props {
  children: React.ReactNode;
  data: Core_Sessions__AuthorizationQuery;
}

export const SessionProvider = ({ children, data }: Props) => {
  return (
    <SessionContext.Provider
      value={{
        session: data?.core_sessions__authorization.user,
        nav: data?.core_nav__show.edges ?? [],
        files: data?.core_sessions__authorization.files,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
