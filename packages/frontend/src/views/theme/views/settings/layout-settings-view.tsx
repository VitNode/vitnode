import React from 'react';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { NavSettings } from './nav/nav-settings';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import { getGlobalData } from '@/graphql/get-global-data';

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
        h2={t('settings.title')}
        desc={t('settings.desc')}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <NavSettings />
        <Card className="grow">{children}</Card>
      </div>
    </div>
  );
};
