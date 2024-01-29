import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { LayoutSettingsView } from '@/themes/1/core/views/settings/layout-settings-view';
import { getConfig } from '@/functions/get-config';

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const config = await getConfig();
  const t = await getTranslations({ locale, namespace: 'core.settings' });

  return {
    title: {
      default: t('title'),
      template: `%s - ${t('title')} - ${config.side_name}`
    },
    robots: 'noindex, nofollow'
  };
}

export default function Layout({ children }: Props) {
  return <LayoutSettingsView>{children}</LayoutSettingsView>;
}
