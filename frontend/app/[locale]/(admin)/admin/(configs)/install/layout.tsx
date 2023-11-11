import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LayoutInstallConfigsView } from '@/admin/configs/views/install/layout-install-configs-view';
import getQueryClient from '@/functions/get-query-client';
import { ErrorType, fetcher } from '@/graphql/fetcher';
import {
  Layout_Admin_Install,
  Layout_Admin_InstallQuery,
  Layout_Admin_InstallQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { InternalErrorView } from '@/admin/views/global/internal-error-view';
import { redirect } from '@/i18n';

interface Props {
  children: ReactNode;
}

const getData = async () => {
  return await fetcher<Layout_Admin_InstallQuery, Layout_Admin_InstallQueryVariables>({
    query: Layout_Admin_Install,
    headers: {
      Cookie: cookies().toString()
    }
  });
};

export default async function Layout({ children }: Props) {
  try {
    const queryClient = getQueryClient();
    const data = await getData();
    await queryClient.setQueryData([APIKeys.LAYOUT_ADMIN_INSTALL], data);
    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <LayoutInstallConfigsView>{children}</LayoutInstallConfigsView>
      </HydrationBoundary>
    );
  } catch (error) {
    const code = error as ErrorType;

    if (code.extensions?.code === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    return <InternalErrorView />;
  }
}
