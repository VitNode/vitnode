import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PluginsCoreAdminView } from '@/admin/views/core/plugins/plugins-admin-view';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('core.plugins.title')
  };
}

export default function Page() {
  return <PluginsCoreAdminView />;
}
