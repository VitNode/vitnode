import { cookies } from 'next/headers';
import { fetcher } from './fetcher';
import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables,
} from './queries/core_sessions__authorization.generated';
import { RevalidateTagEnum } from './revalidate-tags';
import { getUserIdCookie } from './get-user-id-cookie';

export const getSessionData = async () => {
  const userIdFromCookie = getUserIdCookie();

  const data = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    cache: 'force-cache',
    next: {
      tags: [
        userIdFromCookie
          ? `${RevalidateTagEnum.Core_Session}--${userIdFromCookie}`
          : RevalidateTagEnum.Core_Session,
      ],
    },
  });

  return data;
};
