import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables,
} from '@/graphql/queries/admin/install/admin__install__layout.generated';
import { redirect } from '@/navigation';
import { Metadata } from 'next';

import { InternalErrorView } from '../../../global';
import { ContentInstallConfigsView } from './content/content';
import { InstallConfigLayout } from './layout';

const getData = async () => {
  const data = await fetcher<
    Admin__Install__LayoutQuery,
    Admin__Install__LayoutQueryVariables
  >({
    query: Admin__Install__Layout,
    cache: 'force-cache',
  });

  return data;
};

export const generateMetadataInstallConfigs = (): Metadata => {
  return {
    title: 'Install',
  };
};

export const InstallConfigsView = async () => {
  try {
    const data = await getData();

    return (
      <InstallConfigLayout>
        <ContentInstallConfigsView data={data.admin__install__layout.status} />
      </InstallConfigLayout>
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    return <InternalErrorView />;
  }
};
