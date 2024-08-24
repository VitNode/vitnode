import { getGlobalData } from '@/graphql/get-global-data';
import { getSessionAdminData } from '@/graphql/get-session-admin';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AsideAuthAdmin } from './auth/aside/aside';
import { HeaderAdmin } from './auth/header/header';
import { AdminProviders } from './providers';

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

  return (
    <AdminProviders data={data}>
      <AsideAuthAdmin />
      <HeaderAdmin />
      <main className="text-card-foreground mt-16 px-2 py-6 md:my-0 md:ml-[240px] md:mt-0 md:px-6 lg:px-10 xl:ml-[260px]">
        <div className="container">{children}</div>
      </main>
    </AdminProviders>
  );
};
