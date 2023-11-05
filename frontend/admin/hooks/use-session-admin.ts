import { createContext, useContext } from 'react';

import { AuthorizationCurrentUserObj, ShowCoreLanguages } from '@/graphql/hooks';

interface Args {
  languages: Omit<ShowCoreLanguages, 'protected'>[];
  session: AuthorizationCurrentUserObj | undefined | null;
  side_name: string;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  side_name: '',
  languages: []
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
