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
  initialData: Authorization_Core_SessionsQuery | undefined;
}

export const SessionProvider = ({ children, initialData }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION],
    queryFn: async () =>
      fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>({
        query: Authorization_Core_Sessions
      }),
    initialData
  });

  return (
    <SessionContext.Provider value={{ session: data?.authorization_core_sessions.user }}>
      {children}
    </SessionContext.Provider>
  );
};
