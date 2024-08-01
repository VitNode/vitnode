import { fetcher } from './fetcher';
import {
  Admin__Sessions__Authorization,
  Admin__Sessions__AuthorizationQuery,
  Admin__Sessions__AuthorizationQueryVariables,
} from './queries/admin/admin__sessions__authorization.generated';

export const getSessionAdminData = async () => {
  const data = await fetcher<
    Admin__Sessions__AuthorizationQuery,
    Admin__Sessions__AuthorizationQueryVariables
  >({
    query: Admin__Sessions__Authorization,
    cache: 'force-cache',
  });

  return data;
};
