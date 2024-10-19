import { TranslationsProvider } from '@/components/translations-provider';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Groups__Show,
  Admin__Core_Groups__ShowQuery,
  Admin__Core_Groups__ShowQueryVariables,
} from '@/graphql/queries/admin/members/groups/admin__core_groups__show.generated';
import { ShowAdminGroupsSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ActionsGroupsMembersAdmin } from './actions/actions-groups-members-admin';
import { TableGroupsMembersAdmin } from './table/table';

const getData = async (variables: Admin__Core_Groups__ShowQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Groups__ShowQuery,
    Admin__Core_Groups__ShowQueryVariables
  >({
    query: Admin__Core_Groups__Show,
    variables,
    cache: 'force-cache',
  });

  return data;
};

export interface GroupsMembersAdminViewProps {
  searchParams: Promise<SearchParamsPagination>;
}

const permission = {
  plugin_code: 'members',
  group: 'can_manage_groups',
  permission: '',
};

export const generateMetadataGroupsMembersAdmin =
  async (): Promise<Metadata> => {
    const perm = await checkAdminPermissionPageMetadata(permission);
    if (perm) return perm;
    const t = await getTranslations('admin.members.groups');

    return {
      title: t('title'),
    };
  };

export const GroupsMembersAdminView = async ({
  searchParams,
}: GroupsMembersAdminViewProps) => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const variables = await getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.groups'),
  ]);

  return (
    <TranslationsProvider namespaces="admin.members.groups">
      <HeaderContent h1={t('title')}>
        <ActionsGroupsMembersAdmin />
      </HeaderContent>

      <TableGroupsMembersAdmin {...data} />
    </TranslationsProvider>
  );
};
