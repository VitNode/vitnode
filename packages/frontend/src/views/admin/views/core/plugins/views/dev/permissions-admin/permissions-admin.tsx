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

export const PermissionsAdminDevPluginAdminView = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const [t, data] = await Promise.all([
    getTranslations('admin.core.plugins.dev.permissions-admin'),
    getData({ pluginCode: code }),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsPermissionsAdminDevPluginAdminView dataFromSSR={data} />
      </HeaderContent>

      <ContentPermissionsAdminDevPluginAdminView {...data} />
    </>
  );
};
