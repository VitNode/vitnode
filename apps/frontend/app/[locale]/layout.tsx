import React from 'react';
import { GeistSans } from 'geist/font/sans';
import {
  RootLayout,
  RootLayoutProps,
  generateMetadataRootLayout,
} from 'vitnode-frontend/views/layout/root-layout';

export const generateMetadata = generateMetadataRootLayout;

export default function Layout(props: RootLayoutProps) {
  return <RootLayout className={GeistSans.className} {...props} />;
}
