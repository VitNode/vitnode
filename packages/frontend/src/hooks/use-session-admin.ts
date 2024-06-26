import * as React from 'react';

import { AuthorizationCurrentUserObj } from '../graphql/hooks';

interface Args {
  session: AuthorizationCurrentUserObj | null | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: '',
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
