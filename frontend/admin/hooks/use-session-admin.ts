import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { Authorization_Admin_SessionsQuery } from '@/graphql/hooks';

interface Args {
  session: Authorization_Admin_SessionsQuery | undefined;
  setEnableSessionQuery: Dispatch<SetStateAction<boolean>>;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  setEnableSessionQuery: () => {}
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
