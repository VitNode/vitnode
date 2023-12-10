import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LanguageProvider } from './language-provider';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Middleware,
  Core_Languages__MiddlewareQuery,
  Core_Languages__MiddlewareQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

const getData = async () => {
  return await fetcher<Core_Languages__MiddlewareQuery, Core_Languages__MiddlewareQueryVariables>({
    query: Core_Languages__Middleware,
    headers: {
      Cookie: cookies().toString()
    }
  });
};

interface Props {
  children: ReactNode;
}

export default async function LocaleLayout({ children }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [APIKeys.LANGUAGES],
    queryFn: getData
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LanguageProvider>{children}</LanguageProvider>
    </HydrationBoundary>
  );
}
