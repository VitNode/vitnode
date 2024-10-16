'use client';

import { Core_Sessions__AuthorizationQuery } from '@/graphql/queries/core_sessions__authorization.generated';
import React from 'react';

import { SessionContext } from '../../../hooks/use-session';

export const AuthProviders = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Core_Sessions__AuthorizationQuery;
}) => {
  return (
    <SessionContext.Provider
      value={{
        session: data.core_sessions__authorization.user,
        nav: data.core_nav__show.edges,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
