import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getConfigFile } from 'vitnode-frontend/helpers/config';
import { AdminLayout } from 'vitnode-frontend/views/admin-layout';

import { AdminLayout as AdminCPLayout } from '@/plugins/admin/layout/admin-layout';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, t] = await Promise.all([
    getConfigFile(),
    getTranslations('admin'),
  ]);

  const defaultTitle = `${t('title_short')} - ${config.settings.general.site_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  return (
    <AdminLayout>
      <AdminCPLayout>{children}</AdminCPLayout>
    </AdminLayout>
  );
}
