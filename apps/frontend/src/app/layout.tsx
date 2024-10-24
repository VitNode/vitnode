import { GeistSans } from 'geist/font/sans';
import { TranslationsProvider } from 'vitnode-frontend/components/translations-provider';

import './global.css';

import {
  generateMetadataRootLayout,
  RootLayout,
} from 'vitnode-frontend/views/layout/root-layout';

export const generateMetadata = generateMetadataRootLayout;

export default function Layout(
  props: Omit<React.ComponentProps<typeof RootLayout>, 'className'>,
) {
  return (
    <TranslationsProvider namespaces={[]}>
      <RootLayout className={GeistSans.className} {...props} />
    </TranslationsProvider>
  );
}
