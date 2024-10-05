import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  getPaginationTool,
  SearchParamsPagination,
} from '@/graphql/get-pagination-tool';
import {
  Admin__Core_Members__Show,
  Admin__Core_Members__ShowQuery,
  Admin__Core_Members__ShowQueryVariables,
} from '@/graphql/queries/admin/members/users/admin__core_members__show.generated';
import { ShowAdminMembersSortingColumnEnum } from '@/graphql/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CreateUserUsersMembersAdmin } from './create/create';
import { TableUsersMembersAdmin } from './table/table';

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
  searchParams: Promise<SearchParams>;
}

export const generateMetadataUsersMembersAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.members.users');

    return {
      title: t('title'),
    };
  };

export const UsersMembersAdminView = async ({
  searchParams,
}: UsersMembersAdminViewProps) => {
  const { groups } = await searchParams;
  const variables: Admin__Core_Members__ShowQueryVariables = {
    ...getPaginationTool({
      searchParams,
      sortByEnum: ShowAdminMembersSortingColumnEnum,
      defaultPageSize: 10,
    }),
    groups: Array.isArray(groups)
      ? groups.map(group => Number(group))
      : Number(groups),
  };

  const [data, t] = await Promise.all([
    getData(variables),
    getTranslations('admin.members.users'),
  ]);

  // console.log('data', data);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <CreateUserUsersMembersAdmin />
      </HeaderContent>

      <TableUsersMembersAdmin {...data} />
    </>
  );
};
