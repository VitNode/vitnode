import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AdminProviders } from './providers';
import { getSessionAdminData } from '@/graphql/get-session-admin';
import { getGlobalData } from '@/graphql/get-global-data';

export const generateMetadataAdminLayout = async (): Promise<Metadata> => {
  const [data, t] = await Promise.all([
    getGlobalData(),
    getTranslations('admin'),
  ]);

  return {
    title: {
      default: t('title_short'),
      template: `%s - ${t('title_short')} - ${data.core_settings__show.site_short_name}`,
    },
  };
};

export const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = await getSessionAdminData();

  return <AdminProviders data={data}>{children}</AdminProviders>;
};
