import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin__Core_Plugins__Show,
  Admin__Core_Plugins__ShowQuery,
  Admin__Core_Plugins__ShowQueryVariables,
} from '@/graphql/queries/admin/plugins/admin__core_plugins__show.generated';
import { ShowAdminPluginsSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsPluginsAdmin } from './actions/actions';
import { ContentPluginsCoreAdmin } from './content';
import { WarnReqRestartServer } from './warn-req-restart-server';

export interface PluginsAdminViewProps {
  searchParams: SearchParamsPagination;
}

const getData = async (variables: Admin__Core_Plugins__ShowQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Plugins__ShowQuery,
    Admin__Core_Plugins__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Show,
    variables,
  });

  return data;
};

export const generateMetadataPluginsAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.plugins');

  return {
    title: t('title'),
  };
};

export const PluginsAdminView = async ({
  searchParams,
}: PluginsAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminPluginsSortingColumnEnum,
    defaultPageSize: 10,
  });
  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.core.plugins'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsPluginsAdmin />
      </HeaderContent>

      <WarnReqRestartServer />
      <ContentPluginsCoreAdmin {...data} />
    </>
  );
};
