import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';

import '@/admin/layout/global.scss';

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslator(locale, 'admin');

  return {
    title: t('title')
  };
}

export default function Layout({ children }: Props) {
  return children;
}
