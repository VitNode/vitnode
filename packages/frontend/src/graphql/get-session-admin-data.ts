import { fetcher } from './fetcher';
import { getAdminIdCookie, getUserIdCookie } from './get-user-id-cookie';
import {
  Admin__Sessions__Authorization,
  Admin__Sessions__AuthorizationQuery,
  Admin__Sessions__AuthorizationQueryVariables,
} from './queries/admin/admin__sessions__authorization.generated';
import { RevalidateTagEnum } from './revalidate-tags';

export const getSessionAdminData = async () => {
  const adminIdFromCookie = getAdminIdCookie();

  const data = await fetcher<
    Admin__Sessions__AuthorizationQuery,
    Admin__Sessions__AuthorizationQueryVariables
  >({
    query: Admin__Sessions__Authorization,
    cache: 'force-cache',
    next: {
      tags: [
        adminIdFromCookie
          ? `${RevalidateTagEnum.Admin_Core_Sessions}--${adminIdFromCookie}`
          : RevalidateTagEnum.Admin_Core_Sessions,
      ],
    },
  });

  return data;
};
