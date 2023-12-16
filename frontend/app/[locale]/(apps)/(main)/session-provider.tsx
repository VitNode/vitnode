'use client';

import { ReactNode } from 'react';

import { SessionContext } from '@/hooks/core/use-session';
import { Core_Sessions__AuthorizationQuery } from '@/graphql/hooks';

interface Props {
  children: ReactNode;
  data: Core_Sessions__AuthorizationQuery;
}

export const SessionProvider = ({ children, data }: Props) => {
  return (
    <SessionContext.Provider
      value={{
        session: data?.core_sessions__authorization.user
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
