import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables,
} from './graphql';
import { fetcher } from './fetcher';

export const getSessionData = async () => {
  const { data } = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: 'force-cache',
  });

  return data;
};
