import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LayoutSettingsView } from 'vitnode-frontend/theme-tsx/settings/layout-settings-view';
import { getGlobalData } from 'vitnode-frontend/graphql/get-global-data';

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [data, t] = await Promise.all([
    getGlobalData(),
    getTranslations('core.settings'),
  ]);

  return {
    title: {
      default: t('title'),
      template: `%s - ${t('title')} - ${data.core_settings__show.site_name}`,
    },
    robots: 'noindex, nofollow',
  };
}

export default function Layout({ children }: Props) {
  return <LayoutSettingsView>{children}</LayoutSettingsView>;
}
