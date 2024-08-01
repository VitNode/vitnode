import { fetcher } from './fetcher';
import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables,
} from './queries/core_sessions__authorization.generated';

export const getSessionData = async () => {
  const data = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: 'force-cache',
  });

  return data;
};
