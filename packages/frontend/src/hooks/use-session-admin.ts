import { Admin__Sessions__AuthorizationQuery } from '@/graphql/queries/admin/admin__sessions__authorization.generated';
import React from 'react';

interface Args {
  session?: Admin__Sessions__AuthorizationQuery['admin__sessions__authorization']['user'];
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session:
    {} as Admin__Sessions__AuthorizationQuery['admin__sessions__authorization']['user'],
  version: '',
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
