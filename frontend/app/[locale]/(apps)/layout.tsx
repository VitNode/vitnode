import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LanguageProvider } from './language-provider';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Middleware_Core_Languages,
  Middleware_Core_LanguagesQuery,
  Middleware_Core_LanguagesQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

const getData = async () => {
  return await fetcher<Middleware_Core_LanguagesQuery, Middleware_Core_LanguagesQueryVariables>({
    query: Middleware_Core_Languages,
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
