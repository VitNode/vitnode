import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LangsCoreAdminView } from '@/admin/views/core/langs/langs-core-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Show,
  Core_Languages__ShowQuery,
  Core_Languages__ShowQueryVariables
} from '@/graphql/hooks';
import getQueryClient from '@/functions/get-query-client';
import { APIKeys } from '@/graphql/api-keys';
import { emptyPagination } from '@/hooks/core/utils/use-pagination-api';

interface Props {
  params: {
    locale: string;
  };
}

const FIRST = 10;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('core.langs.title')
  };
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [APIKeys.LANGUAGES_ADMIN, { ...emptyPagination({ first: FIRST }) }],
    queryFn: async () =>
      await fetcher<Core_Languages__ShowQuery, Core_Languages__ShowQueryVariables>({
        query: Core_Languages__Show,
        variables: {
          first: FIRST
        },
        headers: {
          Cookie: cookies().toString()
        }
      })
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LangsCoreAdminView />
    </HydrationBoundary>
  );
}
