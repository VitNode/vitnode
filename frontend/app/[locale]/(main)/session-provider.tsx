'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SessionContext } from '@/hooks/core/use-session';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION],
    queryFn: async () =>
      fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>({
        query: Authorization_Core_Sessions
      })
  });

  return (
    <SessionContext.Provider
      value={{
        session: data?.authorization_core_sessions.user,
        languages: data?.show_core_languages.edges ?? []
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
