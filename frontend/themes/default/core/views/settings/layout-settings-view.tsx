import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { NavSettings } from './nav/nav-settings';

interface Props {
  children: ReactNode;
}

export const LayoutSettingsView = ({ children }: Props) => {
  const t = useTranslations('core');

  return (
    <>
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h2>
        <p className="text-muted-foreground">{t('settings.desc')}</p>
      </div>

      <div className="lg:gap-8 flex flex-col lg:flex-row gap-4">
        <NavSettings />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};
