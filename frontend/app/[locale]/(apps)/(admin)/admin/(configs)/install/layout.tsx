import type { ReactNode } from 'react';
import { cookies } from 'next/headers';

import { LayoutInstallConfigsView } from '@/admin/configs/views/install/layout-install-configs-view';
import { fetcher, type ErrorType } from '@/graphql/fetcher';
import {
  Admin_Install__Layout,
  type Admin_Install__LayoutQuery,
  type Admin_Install__LayoutQueryVariables
} from '@/graphql/hooks';
import { InternalErrorView } from '@/admin/global/internal-error-view';
import { redirect } from '@/i18n';
import { RedirectsInstallConfigsLayout } from '@/admin/configs/views/install/redirects-install-configs-layout';

interface Props {
  children: ReactNode;
}

const getData = async () => {
  return await fetcher<Admin_Install__LayoutQuery, Admin_Install__LayoutQueryVariables>({
    query: Admin_Install__Layout,
    headers: {
      Cookie: cookies().toString()
    }
  });
};

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();

    return (
      <RedirectsInstallConfigsLayout data={data}>
        <LayoutInstallConfigsView>{children}</LayoutInstallConfigsView>
      </RedirectsInstallConfigsLayout>
    );
  } catch (error) {
    const code = error as ErrorType;

    if (code.extensions?.code === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    return <InternalErrorView />;
  }
}
