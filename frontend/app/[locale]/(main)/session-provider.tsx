'use client';

import { ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SessionContext } from '@/hooks/core/use-session';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { useRouter } from '@/i18n';

interface Props {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  const { push } = useRouter();
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION],
    queryFn: async () =>
      fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>({
        query: Authorization_Core_Sessions
      })
  });

  // Redirect to install if no languages are installed
  useEffect(() => {
    if (!data || data.show_core_languages.edges.length > 0) return;

    push('/admin/install');
  }, [data]);

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
