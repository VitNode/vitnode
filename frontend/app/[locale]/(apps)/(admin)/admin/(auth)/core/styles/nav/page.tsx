import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { NavAdminView } from '@/admin/core/views/core/styles/nav/nav-admin-view';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.core.styles.nav' });

  return {
    title: t('title')
  };
}

export default function Page() {
  return <NavAdminView />;
}
