import { createContext, useContext } from 'react';

import { Authorization_Admin_SessionsQuery } from '@/graphql/hooks';

interface Args {
  session: Authorization_Admin_SessionsQuery | undefined;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
