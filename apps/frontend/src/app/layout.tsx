import { GeistSans } from 'geist/font/sans';
import {
  generateMetadataRootLayout,
  RootLayout,
  RootLayoutProps,
} from 'vitnode-frontend/views/layout/root-layout';

import './global.css';

export const generateMetadata = generateMetadataRootLayout;

export default function Layout(props: RootLayoutProps) {
  return <RootLayout className={GeistSans.className} {...props} />;
}
