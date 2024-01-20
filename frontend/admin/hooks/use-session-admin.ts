import { createContext, useContext } from 'react';

import type { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: Omit<AuthorizationCurrentUserObj, 'posts'> | undefined | null;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
