import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import '@/admin/layout/global.scss';

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin' });

  return {
    title: t('title'),
    robots: 'noindex, nofollow'
  };
}

export default function Layout({ children }: Props) {
  return children;
}
