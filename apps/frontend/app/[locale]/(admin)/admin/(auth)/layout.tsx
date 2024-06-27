import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getConfigFile } from 'vitnode-frontend/helpers/config';
import { AdminLayout } from 'vitnode-frontend/views/admin/layout/admin-layout';
import { AuthAdminLayout } from 'vitnode-frontend/views/admin/layout/auth/auth-admin-layout';

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

export default function Layout({ children }: Props) {
  return (
    <AdminLayout>
      <AuthAdminLayout>{children}</AuthAdminLayout>
    </AdminLayout>
  );
}
