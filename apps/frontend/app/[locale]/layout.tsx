import * as React from 'react';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import { RootLayout } from 'vitnode-frontend/views/root-layout';
import { CONFIG } from 'vitnode-frontend/helpers/config-with-env';
import '@/app/[locale]/(admin)/admin/global.css';
import './global.css';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateMetadata({ params: { locale } }: Props): Metadata {
  return {
    manifest: `${CONFIG.backend_public_url}/assets/${locale}/manifest.webmanifest`,
  };
}

export default function LocaleLayout(props: Props) {
  return <RootLayout className={GeistSans.className} {...props} />;
}
