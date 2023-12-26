import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { AdministratorsStaffAdminView } from '@/admin/views/members/staff/views/administrators/administrators-view';
import {
  Core_Staff_Administrators__Admin__Show,
  ShowAdminStaffAdministratorsSortingColumnEnum,
  type Core_Staff_Administrators__Admin__ShowQuery,
  type Core_Staff_Administrators__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import { fetcher } from '@/graphql/fetcher';
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from '@/hooks/core/utils/use-pagination-api-ssr';

const getData = async (variables: Core_Staff_Administrators__Admin__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Staff_Administrators__Admin__ShowQuery,
    Core_Staff_Administrators__Admin__ShowQueryVariables
  >({
    query: Core_Staff_Administrators__Admin__Show,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

interface Props {
  params: {
    locale: string;
  };
  searchParams: SearchParamsPagination;
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.members.staff.administrators' });

  return {
    title: t('title')
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    search: true,
    sortByEnum: ShowAdminStaffAdministratorsSortingColumnEnum,
    defaultPageSize: 10
  });

  const data = await getData(variables);

  return <AdministratorsStaffAdminView data={data} />;
}
