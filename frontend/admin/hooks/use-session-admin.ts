import { createContext, useContext } from 'react';

import { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: AuthorizationCurrentUserObj | undefined | null;
  side_name: string;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  side_name: ''
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
