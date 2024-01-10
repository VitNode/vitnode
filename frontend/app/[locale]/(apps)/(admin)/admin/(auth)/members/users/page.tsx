import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import { UsersMembersAdminView } from '@/admin/views/members/users/users-members-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Admin__Show,
  ShowAdminMembersSortingColumnEnum,
  type Core_Members__Admin__ShowQuery,
  type Core_Members__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from '@/hooks/core/utils/use-pagination-api-ssr';

interface SearchParams extends SearchParamsPagination {
  groups?: string[];
}

interface Props {
  params: {
    locale: string;
  };
  searchParams: SearchParams;
}

const getData = async (variables: Core_Members__Admin__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Members__Admin__ShowQuery,
    Core_Members__Admin__ShowQueryVariables
  >({
    query: Core_Members__Admin__Show,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.members.users' });

  return {
    title: t('title')
  };
}

export default async function Page({ searchParams }: Props) {
  const variables: Core_Members__Admin__ShowQueryVariables = {
    ...usePaginationAPISsr({
      searchParams,
      sortByEnum: ShowAdminMembersSortingColumnEnum,
      search: true,
      defaultPageSize: 10
    }),
    groups: Array.isArray(searchParams.groups)
      ? searchParams.groups?.map(group => Number(group))
      : Number(searchParams.groups)
  };
  const data = await getData(variables);

  return <UsersMembersAdminView data={data} />;
}
