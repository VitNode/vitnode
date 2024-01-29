import { createContext, useContext } from 'react';

import type { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: Omit<AuthorizationCurrentUserObj, 'posts'> | undefined | null;
  theme_id: number | null;
}

export const SessionContext = createContext<Args>({
  session: null,
  theme_id: null
});

export const useSession = () => useContext(SessionContext);
