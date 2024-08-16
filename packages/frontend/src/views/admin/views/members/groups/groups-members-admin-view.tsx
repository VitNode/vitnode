import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { ActionsGroupsMembersAdmin } from './actions/actions-groups-members-admin';
import { TableGroupsMembersAdmin } from './table/table';
import { fetcher } from '@/graphql/fetcher';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import {
  Admin__Core_Groups__Show,
  Admin__Core_Groups__ShowQuery,
  Admin__Core_Groups__ShowQueryVariables,
} from '@/graphql/queries/admin/members/groups/admin__core_groups__show.generated';
import { ShowAdminGroupsSortingColumnEnum } from '@/graphql/types';

const getData = async (variables: Admin__Core_Groups__ShowQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Groups__ShowQuery,
    Admin__Core_Groups__ShowQueryVariables
  >({
    query: Admin__Core_Groups__Show,
    variables,
  });

  return data;
};

export interface GroupsMembersAdminViewProps {
  searchParams: SearchParamsPagination;
}

export const generateMetadataGroupsMembersAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.groups');

    return {
      title: t('title'),
    };
  };

export const GroupsMembersAdminView = async ({
  searchParams,
}: GroupsMembersAdminViewProps) => {
  const variables = getPaginationTool({
    searchParams,
    sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize: 10,
  });

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.groups'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsGroupsMembersAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableGroupsMembersAdmin {...data} />
      </Card>
    </>
  );
};
