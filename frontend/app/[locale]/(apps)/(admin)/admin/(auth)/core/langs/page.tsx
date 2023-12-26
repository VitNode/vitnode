import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { LangsCoreAdminView } from '@/admin/views/core/langs/langs-core-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Show,
  type Core_Languages__ShowQuery,
  type Core_Languages__ShowQueryVariables
} from '@/graphql/hooks';
import {
  usePaginationAPISsr,
  type SearchParamsPagination
} from '@/hooks/core/utils/use-pagination-api-ssr';

const getData = async (variables: Core_Languages__ShowQueryVariables) => {
  const { data } = await fetcher<Core_Languages__ShowQuery, Core_Languages__ShowQueryVariables>({
    query: Core_Languages__Show,
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
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('core.langs.title')
  };
}

export default async function Page({ searchParams }: Props) {
  const variables = usePaginationAPISsr({
    searchParams,
    defaultPageSize: 10
  });

  const data = await getData(variables);

  return <LangsCoreAdminView data={data} />;
}
