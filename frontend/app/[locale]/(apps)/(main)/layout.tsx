import { lazy, type LazyExoticComponent, type ReactNode } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { SessionProvider } from './session-provider';
import { InternalErrorView } from '@/admin/core/global/internal-error-view';
import { redirect } from '@/i18n';
import { getSessionData } from '@/functions/get-session-data';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function Layout({ children }: Props) {
  try {
    const { data, theme_id } = await getSessionData();
    if (data.core_languages__show.edges.length === 0) {
      redirect('/admin/install');
    }

    const Layout: LazyExoticComponent<({ children }: { children: ReactNode }) => JSX.Element> =
      lazy(() =>
        import(`@/themes/${theme_id}/core/layout/layout`).catch(
          () => import('@/themes/1/core/layout/layout')
        )
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
