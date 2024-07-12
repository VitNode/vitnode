import * as React from 'react';
import { useTranslations } from 'next-intl';

import { NavSettings } from './nav/nav-settings';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';

interface Props {
  children: React.ReactNode;
}

export const LayoutSettingsView = ({ children }: Props) => {
  const t = useTranslations('core');

  return (
    <>
      <HeaderContent
        className="mb-5"
        h2={t('settings.title')}
        desc={t('settings.desc')}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <NavSettings />
        <Card className="grow">{children}</Card>
      </div>
    </>
  );
};
