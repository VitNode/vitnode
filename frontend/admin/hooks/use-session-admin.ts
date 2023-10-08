import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { Admin_Authorization_Core_SessionsQuery } from '@/graphql/hooks';

interface Args {
  session: Admin_Authorization_Core_SessionsQuery | undefined;
  setEnableSessionQuery: Dispatch<SetStateAction<boolean>>;
}

export const SessionAdminContext = createContext<Args>({
  session: undefined,
  setEnableSessionQuery: () => {}
});

export const useSessionAdmin = () => useContext(SessionAdminContext);
