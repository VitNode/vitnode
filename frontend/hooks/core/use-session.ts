import { createContext, useContext } from 'react';

import { AuthorizationCurrentUserObj } from '@/graphql/hooks';

interface Args {
  session: AuthorizationCurrentUserObj | undefined | null;
}

export const SessionContext = createContext<Args>({
  session: null
});

export const useSession = () => useContext(SessionContext);
