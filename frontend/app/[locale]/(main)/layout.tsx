import { ReactNode, lazy } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionProvider } from './session-provider';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const getData = async () => {
  return await fetcher<Authorization_Core_SessionsQuery, Authorization_Core_SessionsQueryVariables>(
    {
      query: Authorization_Core_Sessions,
      headers: {
        Cookie: cookies().toString()
      }
    }
  );
};

export default async function Layout({ children }: Props) {
  const Layout = lazy(() =>
    import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
      default: module.Layout
    }))
  );

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['Authorization'],
    queryFn: getData
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionProvider enableSession={!!data.authorization_core_sessions}>
        <Layout>{children}</Layout>
      </SessionProvider>
    </HydrationBoundary>
  );
}
