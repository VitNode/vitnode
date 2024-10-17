import { AuthorizationCurrentUserObj, ShowCoreNav } from '@/graphql/types';
import React from 'react';

interface Args {
  nav: ShowCoreNav[];
  session: null | Omit<AuthorizationCurrentUserObj, 'posts'> | undefined;
}

export const SessionContext = React.createContext<Args>({
  session: null,
  nav: [],
});

export const useSession = () => React.useContext(SessionContext);
