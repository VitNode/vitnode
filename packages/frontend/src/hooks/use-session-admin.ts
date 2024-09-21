import { Admin__Sessions__AuthorizationQuery } from '@/graphql/queries/admin/admin__sessions__authorization.generated';
import React from 'react';

interface Args {
  files: Admin__Sessions__AuthorizationQuery['admin__sessions__authorization']['files'];
  session: Admin__Sessions__AuthorizationQuery['admin__sessions__authorization']['user'];
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: '',
  files: {
    allow_upload: false,
    max_storage_for_submit: 0,
    total_max_storage: 0,
    space_used: 0,
  },
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
