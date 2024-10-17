import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  checkAdminPermission,
  checkAdminPermissionMetadata,
} from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Email__Logs,
  Admin__Core_Email__LogsQuery,
  Admin__Core_Email__LogsQueryVariables,
} from '@/graphql/queries/admin/settings/email/admin__core_email__logs.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentLogsEmailSettingsAdmin } from './content';

const getData = async (variables: Admin__Core_Email__LogsQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Email__LogsQuery,
    Admin__Core_Email__LogsQueryVariables
  >({
    query: Admin__Core_Email__Logs,
    variables,
  });

  return data;
};

const permission = {
  plugin_code: 'core',
  group: 'settings',
  permission: 'can_manage_settings_email',
};

export const generateMetadataLogsEmailSettingsAdmin =
  async (): Promise<Metadata> => {
    const perm = await checkAdminPermissionMetadata(permission);
    if (perm) return perm;
    const t = await getTranslations('admin.core.settings.email.logs');

    return {
      title: t('title'),
    };
  };

export const LogsEmailSettingsAdminView = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsPagination>;
}) => {
  const perm = await checkAdminPermission(permission);
  if (perm) return perm;
  const variables = await getPaginationTool({
    searchParams,
    defaultPageSize: 10,
  });

  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.email.logs'),
    getData(variables),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} />
      <ContentLogsEmailSettingsAdmin {...data} />
    </>
  );
};
