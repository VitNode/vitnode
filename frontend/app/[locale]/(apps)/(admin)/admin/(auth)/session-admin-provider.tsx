'use client';

import configs from '~/config.json';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Sessions__Authorization,
  Admin_Sessions__AuthorizationQuery,
  Admin_Sessions__AuthorizationQueryVariables
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
      await fetcher<
        Admin_Sessions__AuthorizationQuery,
        Admin_Sessions__AuthorizationQueryVariables
      >({
        query: Admin_Sessions__Authorization
      })
  });

  if (!data) return <ErrorView code="403" />;

  return (
    <SessionAdminContext.Provider
      value={{
        session: data.admin_sessions__authorization.user,
        side_name: configs.side_name
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
