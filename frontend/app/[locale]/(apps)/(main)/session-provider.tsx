'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SessionContext } from '@/hooks/core/use-session';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION],
    queryFn: async () =>
      fetcher<Core_Sessions__AuthorizationQuery, Core_Sessions__AuthorizationQueryVariables>({
        query: Core_Sessions__Authorization
      })
  });

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
