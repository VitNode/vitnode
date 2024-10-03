import { GeistSans } from 'geist/font/sans';
import {
  generateMetadataRootLayout,
  RootLayout,
} from 'vitnode-frontend/views/layout/root-layout';

import './global.css';

export const generateMetadata = generateMetadataRootLayout;

export default function Layout(props: React.ComponentProps<typeof RootLayout>) {
  return <RootLayout className={GeistSans.className} {...props} />;
}
