import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { getGlobalData } from '@/graphql/get-global-data';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { NavSettings } from './nav/nav-settings';

export const generateMetadataLayoutSettings = async (): Promise<Metadata> => {
  const [data, t] = await Promise.all([
    getGlobalData(),
    getTranslations('core.settings'),
  ]);

  return {
    title: {
      default: t('title'),
      template: `%s - ${t('title')} - ${data.core_settings__show.site_short_name}`,
    },
    robots: 'noindex, nofollow',
  };
};

export const LayoutSettingsView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('core');

  return (
    <div className="container my-4">
      <HeaderContent
        className="mb-5"
        desc={t('settings.desc')}
        h2={t('settings.title')}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <NavSettings />
        <Card className="grow">{children}</Card>
      </div>
    </div>
  );
};
