import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { ActionsGroupsMembersAdmin } from './actions/actions-groups-members-admin';
import { TableGroupsMembersAdmin } from './table/table';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Groups__Show,
  Admin__Core_Groups__ShowQuery,
  Admin__Core_Groups__ShowQueryVariables,
  ShowAdminGroupsSortingColumnEnum,
} from '@/graphql/graphql';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';

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

export const generateMetadataGroupsMembersAdminView =
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
    search: true,
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
