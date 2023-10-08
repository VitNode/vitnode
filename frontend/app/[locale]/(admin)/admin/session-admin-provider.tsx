'use client';

import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Authorization_Core_Sessions,
  Admin_Authorization_Core_SessionsQuery,
  Admin_Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionAdminContext } from '@/admin/hooks/use-session-admin';

interface Props {
  children: ReactNode;
  initialDataSession: Admin_Authorization_Core_SessionsQuery | undefined;
}

export const SessionAdminProvider = ({ children, initialDataSession }: Props) => {
  const [enableSessionQuery, setEnableSessionQuery] = useState(!!initialDataSession);

  const { data } = useQuery({
    queryKey: ['Authorization.Admin'],
    queryFn: async () =>
      await fetcher<
        Admin_Authorization_Core_SessionsQuery,
        Admin_Authorization_Core_SessionsQueryVariables
      >({
        query: Admin_Authorization_Core_Sessions
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
