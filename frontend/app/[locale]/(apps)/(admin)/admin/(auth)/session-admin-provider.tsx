'use client';

import configs from '~/config.json';

import type { ReactNode } from 'react';

import type { Admin_Sessions__AuthorizationQuery } from '@/graphql/hooks';
import { SessionAdminContext } from '@/admin/hooks/use-session-admin';

interface Props {
  children: ReactNode;
  data: Admin_Sessions__AuthorizationQuery;
}

export const SessionAdminProvider = ({ children, data }: Props) => {
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
