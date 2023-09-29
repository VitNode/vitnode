'use client';

import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Admin_Core_Sessions,
  Authorization_Admin_Core_SessionsQuery,
  Authorization_Admin_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionAdminContext } from '@/admin/hooks/use-session-admin';

interface Props {
  children: ReactNode;
  initialDataSession: Authorization_Admin_Core_SessionsQuery | undefined;
}

export const SessionAdminProvider = ({ children, initialDataSession }: Props) => {
  const [enableSessionQuery, setEnableSessionQuery] = useState(!!initialDataSession);

  const { data } = useQuery({
    queryKey: ['Authorization.Admin'],
    queryFn: async () =>
      await fetcher<
        Authorization_Admin_Core_SessionsQuery,
        Authorization_Admin_Core_SessionsQueryVariables
      >({
        query: Authorization_Admin_Core_Sessions
      }),
    initialData: initialDataSession,
    enabled: enableSessionQuery
  });

  return (
    <SessionAdminContext.Provider value={{ session: data, setEnableSessionQuery }}>
      {children}
    </SessionAdminContext.Provider>
  );
};
