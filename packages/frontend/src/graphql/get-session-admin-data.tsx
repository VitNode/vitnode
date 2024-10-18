import { ErrorView } from '@/views/theme/views/error/error-view';
import { fetcher } from './fetcher';
import { getAdminIdCookie } from './get-user-id-cookie';
import {
  Admin__Sessions__Authorization,
  Admin__Sessions__AuthorizationQuery,
  Admin__Sessions__AuthorizationQueryVariables,
} from './queries/admin/admin__sessions__authorization.generated';
import { RevalidateTagEnum } from './revalidate-tags';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export interface PermissionSessionAdmin {
  plugin_code: string;
  group: string;
  permission: string;
}

export const checkAdminPermissionPage = async ({
  plugin_code,
  group,
  permission,
}: PermissionSessionAdmin) => {
  try {
    const {
      admin__sessions__authorization: { permissions },
    } = await getSessionAdminData();
    if (permissions.length === 0) return;
    const findPlugin = permissions.find(
      item => item.plugin_code === plugin_code,
    );
    const findGroup = findPlugin?.groups.find(item => item.id === group);
    if (findGroup?.permissions.length === 0) return;
    const findPermission = findGroup?.permissions.find(
      item => item === permission,
    );
    if (!findPermission) return <ErrorView code="403" />;

    return;
  } catch (error) {
    return <ErrorView code="500" />;
  }
};

export const checkAdminPermissionPageMetadata = async ({
  plugin_code,
  group,
  permission,
}: PermissionSessionAdmin): Promise<Metadata> => {
  const {
    admin__sessions__authorization: { permissions },
  } = await getSessionAdminData();
  if (permissions.length === 0) return {};
  const findPlugin = permissions.find(item => item.plugin_code === plugin_code);
  const findGroup = findPlugin?.groups.find(item => item.id === group);
  if (findGroup?.permissions.length === 0) return {};
  const findPermission = findGroup?.permissions.find(
    item => item === permission,
  );
  if (!findPermission) {
    const t = await getTranslations('core.global.errors');

    return {
      title: t('403'),
    };
  }

  return {};
};

export const isInAdminPermission = async ({
  plugin_code,
  group,
  permission,
}: PermissionSessionAdmin) => {
  const {
    admin__sessions__authorization: { permissions },
  } = await getSessionAdminData();
  if (permissions.length === 0) return true;
  const findPlugin = permissions.find(item => item.plugin_code === plugin_code);
  const findGroup = findPlugin?.groups.find(item => item.id === group);
  if (findGroup?.permissions.length === 0) return true;
  const findPermission = findGroup?.permissions.find(
    item => item === permission,
  );

  return !!findPermission;
};
