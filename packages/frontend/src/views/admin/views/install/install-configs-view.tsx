import { Metadata } from 'next';

import { ContentInstallConfigsView } from './content/content';
import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables,
} from '@/graphql/graphql';
import { FetcherErrorType, fetcher } from '@/graphql/fetcher';
import { redirect } from '@/navigation';
import { InstallConfigLayout } from './layout';

import { InternalErrorView } from '../../../global';

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
    const code = error as FetcherErrorType;

    if (code.extensions?.code === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    return <InternalErrorView />;
  }
};
