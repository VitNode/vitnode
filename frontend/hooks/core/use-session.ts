import { createContext, useContext } from 'react';

import type { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: Omit<AuthorizationCurrentUserObj, 'posts'> | undefined | null;
}

export const SessionContext = createContext<Args>({
  session: null
});

export const useSession = () => useContext(SessionContext);
