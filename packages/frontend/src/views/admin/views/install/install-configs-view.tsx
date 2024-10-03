import { TranslationsProvider } from '@/components/translations-provider';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables,
} from '@/graphql/queries/admin/install/admin__install__layout.generated';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

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
  const locale = await getLocale();

  try {
    const data = await getData();

    return (
      <TranslationsProvider namespaces="core.sign_up">
        <InstallConfigLayout>
          <ContentInstallConfigsView
            data={data.admin__install__layout.status}
          />
        </InstallConfigLayout>
      </TranslationsProvider>
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'ACCESS_DENIED') {
      redirect({ href: '/admin', locale });
    }

    return <InternalErrorView />;
  }
};
