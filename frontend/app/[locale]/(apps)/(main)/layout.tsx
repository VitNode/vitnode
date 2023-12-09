import { LazyExoticComponent, ReactNode, lazy } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_Sessions,
  Authorization_Core_SessionsQuery,
  Authorization_Core_SessionsQueryVariables
} from '@/graphql/hooks';
import { SessionProvider } from './session-provider';
import { InternalErrorView } from '@/admin/global/internal-error-view';
import getQueryClient from '@/functions/get-query-client';
import { APIKeys } from '@/graphql/api-keys';
import { redirect } from '@/i18n';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const getData = async () => {
  const current = await fetcher<
    Authorization_Core_SessionsQuery,
    Authorization_Core_SessionsQueryVariables
  >({
    query: Authorization_Core_Sessions,
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (current.show_core_languages.edges.length <= 0) {
    redirect('/admin/install');
  }

  return current;
};

export default async function Layout({ children }: Props) {
  try {
    const queryClient = getQueryClient();
    const data = await getData();
    await queryClient.setQueryData([APIKeys.AUTHORIZATION], data);
    const dehydratedState = dehydrate(queryClient);

    const Layout: LazyExoticComponent<({ children }: { children: ReactNode }) => JSX.Element> =
      lazy(() =>
        import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
          default: module.Layout
        }))
      );

    return (
      <HydrationBoundary state={dehydratedState}>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </HydrationBoundary>
    );
  } catch (error) {
    // Redirect from catch
    if (isRedirectError(error)) {
      redirect('/admin/install');
    }

    return <InternalErrorView />;
  }
}
