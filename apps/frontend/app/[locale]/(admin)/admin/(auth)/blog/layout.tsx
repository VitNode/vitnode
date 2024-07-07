import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';
import { getGlobalData } from 'vitnode-frontend/graphql/get-global-data';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [data, t, tAdmin] = await Promise.all([
    getGlobalData(),
    getTranslations('blog.admin.nav'),
    getTranslations('admin'),
  ]);

  const defaultTitle = `${t('title')} - ${tAdmin('title_short')} - ${data.core_settings__show.site_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  return children;
}
