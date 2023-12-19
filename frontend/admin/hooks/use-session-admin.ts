import { createContext, useContext } from 'react';

import type { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: Omit<AuthorizationCurrentUserObj, 'posts'> | undefined | null;
  side_name: string;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  side_name: ''
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
