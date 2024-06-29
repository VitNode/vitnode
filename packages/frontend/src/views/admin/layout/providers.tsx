'use client';

import { Admin__Sessions__AuthorizationQuery } from '../../../graphql/graphql';
import { SessionAdminContext } from '../../../hooks/use-session-admin';

interface Props {
  children: React.ReactNode;
  data: Admin__Sessions__AuthorizationQuery;
}

export const AdminProviders = ({ children, data }: Props) => {
  return (
    <SessionAdminContext.Provider
      value={{
        session: data.admin__sessions__authorization.user,
        version: data.admin__sessions__authorization.version,
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
