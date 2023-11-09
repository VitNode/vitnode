import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { LayoutInstallConfigsView } from '@/admin/configs/views/install/layout-install-configs-view';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Layout_Admin_Install,
  Layout_Admin_InstallQuery,
  Layout_Admin_InstallQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { InternalErrorView } from '@/admin/views/global/internal-error-view';

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
    // eslint-disable-next-line no-console
    console.error(error);

    return <InternalErrorView />;
  }
}
