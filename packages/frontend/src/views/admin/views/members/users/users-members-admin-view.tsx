import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { TableUsersMembersAdmin } from './table/table';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Show,
  Admin__Core_Members__ShowQuery,
  Admin__Core_Members__ShowQueryVariables,
  ShowAdminMembersSortingColumnEnum,
} from '@/graphql/graphql';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import {
  SearchParamsPagination,
  getPaginationTool,
} from '@/graphql/get-pagination-tool';

const getData = async (variables: Admin__Core_Members__ShowQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Members__ShowQuery,
    Admin__Core_Members__ShowQueryVariables
  >({
    query: Admin__Core_Members__Show,
    variables,
  });

  return data;
};

interface SearchParams extends SearchParamsPagination {
  groups?: string[];
}

export interface UsersMembersAdminViewProps {
  searchParams: SearchParams;
}

export const generateMetadataUsersMembersAdminView =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.users');

    return {
      title: t('title'),
    };
  };

export const UsersMembersAdminView = async ({
  searchParams,
}: UsersMembersAdminViewProps) => {
  const variables: Admin__Core_Members__ShowQueryVariables = {
    ...getPaginationTool({
      searchParams,
      sortByEnum: ShowAdminMembersSortingColumnEnum,
      search: true,
      defaultPageSize: 10,
    }),
    groups: Array.isArray(searchParams.groups)
      ? searchParams.groups?.map(group => Number(group))
      : Number(searchParams.groups),
  };

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.users'),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} />

      <Card className="p-6">
        <TableUsersMembersAdmin {...data} />
      </Card>
    </>
  );
};
