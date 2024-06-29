import * as React from 'react';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import {
  RootLayout,
  RootLayoutProps,
  generateMetadataForRootLayout,
} from 'vitnode-frontend/views/layout/root-layout';

export async function generateMetadata(
  props: RootLayoutProps,
): Promise<Metadata> {
  const metadata = await generateMetadataForRootLayout(props);

  return metadata;
}

export default function LocaleLayout(props: RootLayoutProps) {
  return <RootLayout className={GeistSans.className} {...props} />;
}
