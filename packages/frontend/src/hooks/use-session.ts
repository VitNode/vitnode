import { Core_Sessions__AuthorizationQuery } from '@/graphql/queries/core_sessions__authorization.generated';
import { AuthorizationCurrentUserObj, ShowCoreNav } from '@/graphql/types';
import React from 'react';

interface Args {
  files: Core_Sessions__AuthorizationQuery['core_sessions__authorization']['files'];
  nav: ShowCoreNav[];
  session: null | Omit<AuthorizationCurrentUserObj, 'posts'> | undefined;
}

export const SessionContext = React.createContext<Args>({
  session: null,
  nav: [],
  files: {
    allow_upload: false,
    max_storage_for_submit: 0,
    total_max_storage: 0,
    space_used: 0,
  },
});

export const useSession = () => React.useContext(SessionContext);
