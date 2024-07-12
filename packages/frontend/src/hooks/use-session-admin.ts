import React from 'react';

import { AuthorizationCurrentUserObj } from '../graphql/graphql';

interface Args {
  session: AuthorizationCurrentUserObj | null | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: '',
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
