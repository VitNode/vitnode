import { AuthorizationCurrentUserObj } from '@/graphql/types';
import React from 'react';

interface Args {
  session: AuthorizationCurrentUserObj | undefined;
  version: string;
}

export const SessionAdminContext = React.createContext<Args>({
  session: undefined,
  version: '',
});

export const useSessionAdmin = () => React.useContext(SessionAdminContext);
