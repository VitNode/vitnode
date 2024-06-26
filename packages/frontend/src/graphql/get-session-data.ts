import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables,
} from './code';

export const getSessionData = async () => {
  const { data } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: 'force-cache',
  });

  return {
    data,
    default_plugin: data.core_sessions__authorization.plugin_default,
  };
};
