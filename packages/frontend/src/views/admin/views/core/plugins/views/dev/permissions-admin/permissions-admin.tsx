import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Permissions_Admin__Show,
  Admin__Core_Plugins__Permissions_Admin__ShowQuery,
  Admin__Core_Plugins__Permissions_Admin__ShowQueryVariables,
} from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';
import { getTranslations } from 'next-intl/server';

import { ActionsPermissionsAdminDevPluginAdminView } from './actions';
import { ContentPermissionsAdminDevPluginAdminView } from './content';

const getData = async (
  variables: Admin__Core_Plugins__Permissions_Admin__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Plugins__Permissions_Admin__ShowQuery,
    Admin__Core_Plugins__Permissions_Admin__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Permissions_Admin__Show,
    variables,
    cache: 'force-cache',
  });

  return data;
};

export interface PermissionsAdminWithI18n {
  id: string;
  name: string;
  permissions: {
    id: string;
    name: string;
  }[];
}

export const PermissionsAdminDevPluginAdminView = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const [t, data, tPlugin] = await Promise.all([
    getTranslations('admin.core.plugins.dev.permissions-admin'),
    getData({ pluginCode: code }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getTranslations(`admin_${code}`),
  ]);

  const dataWithI18n: PermissionsAdminWithI18n[] =
    data.admin__core_plugins__permissions_admin__show.map(permission => ({
      id: permission.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      name: tPlugin(`admin_permissions.${permission.id}`),
      permissions: permission.permissions.map(permission => ({
        id: permission,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: tPlugin(`admin_permissions.${permission}`),
      })),
    }));

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsPermissionsAdminDevPluginAdminView
          dataWithI18n={dataWithI18n}
        />
      </HeaderContent>

      <ContentPermissionsAdminDevPluginAdminView dataWithI18n={dataWithI18n} />
    </>
  );
};
