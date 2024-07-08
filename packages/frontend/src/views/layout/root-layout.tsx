import * as React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';

import { InternalErrorView } from '../global/internal-error/internal-error-view';
import { RootProviders } from './providers';

import { getGlobalData } from '../../graphql/get-global-data';
import { CONFIG } from '../../helpers/config-with-env';

export interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
  className?: string;
}

export const generateMetadataForRootLayout = async ({
  params: { locale },
}: RootLayoutProps): Promise<Metadata> => {
  const metadata: Metadata = {
    manifest: `${CONFIG.backend_public_url}/assets/${locale}/manifest.webmanifest`,
    icons: {
      icon: '/icons/favicon.ico',
    },
  };

  try {
    const {
      core_settings__show: { site_name },
    } = await getGlobalData();

    return {
      ...metadata,
      title: {
        default: site_name,
        template: `%s - ${site_name}`,
      },
    };
  } catch (e) {
    return {
      ...metadata,
      title: 'Error 500!',
      robots: 'noindex, nofollow',
    };
  }
};

export const RootLayout = async ({
  children,
  params: { locale },
  className,
}: RootLayoutProps) => {
  const messages = await getMessages();

  try {
    const middlewareData = await getGlobalData();

    return (
      <html lang={locale} className={className}>
        <body>
          <NextTopLoader
            color="hsl(var(--primary))"
            showSpinner={false}
            height={4}
          />
          <RootProviders middlewareData={middlewareData}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </RootProviders>
        </body>
      </html>
    );
  } catch (e) {
    return (
      <html lang={locale} className={className}>
        <body>
          <RootProviders>
            <NextIntlClientProvider messages={messages}>
              <InternalErrorView />
            </NextIntlClientProvider>
          </RootProviders>
        </body>
      </html>
    );
  }
};
