import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { Authorization_Core_SessionsQuery } from '@/graphql/hooks';

interface Args {
  session: Authorization_Core_SessionsQuery | undefined;
  setEnableSessionQuery: Dispatch<SetStateAction<boolean>>;
}

export const SessionContext = createContext<Args>({
  session: undefined,
  setEnableSessionQuery: () => {}
});

export const useSession = () => useContext(SessionContext);
