'use client';

import { Admin__Sessions__AuthorizationQuery } from '@/graphql/queries/admin/admin__sessions__authorization.generated';

import { SessionAdminContext } from '../../../hooks/use-session-admin';

export const AdminProviders = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Admin__Sessions__AuthorizationQuery;
}) => {
  return (
    <SessionAdminContext.Provider
      value={{
        session: data.admin__sessions__authorization.user,
        version: data.admin__sessions__authorization.version,
        files: data.admin__sessions__authorization.files,
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
