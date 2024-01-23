import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { PluginsCoreAdminView } from '@/admin/views/core/plugins/plugins-admin-view';
import {
  Core_Plugins__Admin__Show,
  type Core_Plugins__Admin__ShowQuery,
  type Core_Plugins__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('core.plugins.title')
  };
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [APIKeys.PLUGINS],
    queryFn: async ({ pageParam }) => {
      const { data } = await fetcher<
        Core_Plugins__Admin__ShowQuery,
        Core_Plugins__Admin__ShowQueryVariables
      >({
        query: Core_Plugins__Admin__Show,
        variables: pageParam,
        headers: {
          Cookie: cookies().toString()
        }
      });

      return data;
    },
    initialPageParam: {
      first: 10
    },
    getNextPageParam: ({ core_plugins__admin__show: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    },
    pages: 1
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PluginsCoreAdminView />
    </HydrationBoundary>
  );
}
