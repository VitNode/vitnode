import { createContext, useContext } from 'react';

import { AuthorizationCurrentUserObj, ShowCoreLanguages } from '@/graphql/hooks';

interface Args {
  languages: Omit<ShowCoreLanguages, 'protected'>[];
  session: AuthorizationCurrentUserObj | undefined | null;
}

export const SessionContext = createContext<Args>({
  session: null,
  languages: []
});

export const useSession = () => useContext(SessionContext);
