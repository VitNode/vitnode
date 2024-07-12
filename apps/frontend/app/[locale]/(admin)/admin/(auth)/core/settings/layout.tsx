import { getTranslations } from 'next-intl/server';
import React from 'react';
import { Metadata } from 'next';
import { getGlobalData } from 'vitnode-frontend/graphql/get-global-data';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [t, tCore, data] = await Promise.all([
    getTranslations('admin'),
    getTranslations('core.admin'),
    getGlobalData(),
  ]);

  const defaultTitle = `${tCore('nav.settings')} - ${t('title_short')} - ${data.core_settings__show.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle,
    },
  };
}

export default async function Layout({ children }: Props) {
  return children;
}
