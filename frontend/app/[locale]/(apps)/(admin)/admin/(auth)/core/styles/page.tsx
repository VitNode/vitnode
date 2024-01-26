import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { ThemesAdminView } from '@/admin/core/views/core/styles/themes/themes-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Themes__Admin__Show,
  type Core_Themes__Admin__ShowQuery,
  type Core_Themes__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from '@/hooks/core/utils/use-pagination-api-ssr';

interface Props {
  params: {
    locale: string;
  };
  searchParams: SearchParamsPagination;
}

const getData = async (variables: Core_Themes__Admin__ShowQueryVariables) => {
  const { data } = await fetcher<
    Core_Themes__Admin__ShowQuery,
    Core_Themes__Admin__ShowQueryVariables
  >({
    query: Core_Themes__Admin__Show,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.core.styles.themes' });

  return {
    title: t('title')
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    // search: true,
    // sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize: 10
  });
  const data = await getData(variables);

  return <ThemesAdminView {...data} />;
}
