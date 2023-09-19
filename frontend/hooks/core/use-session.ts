import { createContext, useContext } from 'react';

import { Authorization_Core_SessionsQuery } from '@/graphql/hooks';

interface Args {
  session: Authorization_Core_SessionsQuery | undefined;
}

export const SessionContext = createContext<Args>({
  session: undefined
});

export const useSession = () => useContext(SessionContext);
