'use client';

import { PermissionSessionAdmin } from '@/graphql/get-session-admin-data';
import { Admin__Sessions__AuthorizationQuery } from '@/graphql/queries/admin/admin__sessions__authorization.generated';

import { SessionAdminContext } from '../../../hooks/use-session-admin';

export const AdminProviders = ({
  children,
  data: {
    admin__sessions__authorization: { permissions, user, version },
  },
}: {
  children: React.ReactNode;
  data: Admin__Sessions__AuthorizationQuery;
}) => {
  const isInAdminPermission = ({
    plugin_code,
    group,
    permission,
  }: PermissionSessionAdmin) => {
    if (permissions.length === 0) return true;
    const findPlugin = permissions.find(
      item => item.plugin_code === plugin_code,
    );
    const findGroup = findPlugin?.groups.find(item => item.id === group);
    if (findGroup?.permissions.length === 0) return true;
    const findPermission = findGroup?.permissions.find(
      item => item === permission,
    );

    return !!findPermission;
  };

  return (
    <SessionAdminContext.Provider
      value={{
        session: user,
        version: version,
        isInAdminPermission,
      }}
    >
      {children}
    </SessionAdminContext.Provider>
  );
};
