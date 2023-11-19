'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import configs from '@/config.json';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Admin_Sessions,
  Authorization_Admin_SessionsQuery,
  Authorization_Admin_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionAdminContext } from '@/admin/hooks/use-session-admin';
import { APIKeys } from '@/graphql/api-keys';
import { ErrorView } from '@/themes/default/core/views/global/error/error-view';

interface Props {
  children: ReactNode;
}

export const SessionAdminProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: [APIKeys.AUTHORIZATION_ADMIN],
    queryFn: async () =>
      await fetcher<Authorization_Admin_SessionsQuery, Authorization_Admin_SessionsQueryVariables>({
        query: Authorization_Admin_Sessions
      })
  });

  if (!data) return <ErrorView code="403" />;

  return (
    <SessionAdminContext.Provider
      value={{
        session: data.authorization_admin_sessions.user,
        side_name: configs.side_name,
        languages: data?.show_core_languages.edges ?? []
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
