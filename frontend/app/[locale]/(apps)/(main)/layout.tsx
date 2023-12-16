import { LazyExoticComponent, ReactNode, lazy } from 'react';
import { cookies } from 'next/headers';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { CONFIG } from '@/config';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__Authorization,
  Core_Sessions__AuthorizationQuery,
  Core_Sessions__AuthorizationQueryVariables
} from '@/graphql/hooks';
import { SessionProvider } from './session-provider';
import { InternalErrorView } from '@/admin/global/internal-error-view';
import { redirect } from '@/i18n';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

const getData = async () => {
  const current = await fetcher<
    Core_Sessions__AuthorizationQuery,
    Core_Sessions__AuthorizationQueryVariables
  >({
    query: Core_Sessions__Authorization,
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (current.core_languages__show.edges.length === 0) {
    redirect('/admin/install');
  }

  return current;
};

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();

    const Layout: LazyExoticComponent<({ children }: { children: ReactNode }) => JSX.Element> =
      lazy(() =>
        import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
          default: module.Layout
        }))
      );

    return (
      <SessionProvider data={data}>
        <Layout>{children}</Layout>
      </SessionProvider>
    );
  } catch (error) {
    // Redirect from catch
    if (isRedirectError(error)) {
      redirect('/admin/install');
    }

    return <InternalErrorView />;
  }
}
