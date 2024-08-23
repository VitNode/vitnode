'use client';

import React from 'react';

import { Core_Sessions__AuthorizationQuery } from '@/graphql/queries/core_sessions__authorization.generated';

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
        nav: data.core_nav__show.edges ?? [],
        files: data.core_sessions__authorization.files,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
