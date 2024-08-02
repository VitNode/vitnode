import React from 'react';

import { AuthorizationCurrentUserObj } from '@/graphql/types';

interface Args {
  session: AuthorizationCurrentUserObj | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: '',
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
