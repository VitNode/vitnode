import * as React from 'react';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';

import { InternalErrorView } from '../global/internal-error/internal-error-view';
import { RootProviders } from './providers';

import { getConfigFile } from '../../helpers/config';
import { fetcher } from '../../graphql/fetcher';
import { Core_Middleware, Core_MiddlewareQuery } from '../../graphql/code';
import { CONFIG } from '../../helpers/config-with-env';
import './global.css';

export interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
  className?: string;
}

export const generateMetadataForRootLayout = async ({
  params: { locale },
}: RootLayoutProps): Promise<Metadata> => {
  const config = await getConfigFile();
  const defaultTitle = config.settings.general.site_name;

  return {
    manifest: `${CONFIG.backend_public_url}/assets/${locale}/manifest.webmanifest`,
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`,
    },
    icons: {
      icon: '/icons/favicon.ico',
    },
  };
};

const getMiddlewareData = async () => {
  const { data } = await fetcher<Core_MiddlewareQuery>({
    query: Core_Middleware,
    cache: 'force-cache',
  });

  return data;
};

export const RootLayout = async ({
  children,
  params: { locale },
  className,
}: RootLayoutProps) => {
  const [messages, config] = await Promise.all([
    getMessages(),
    getConfigFile(),
  ]);

  try {
    const middlewareData = await getMiddlewareData();

    return (
      <html lang={locale} className={className}>
        <body>
          <NextTopLoader
            color="hsl(var(--primary))"
            showSpinner={false}
            height={4}
          />
          <RootProviders middlewareData={middlewareData} config={config}>
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
          <RootProviders config={config}>
            <NextIntlClientProvider messages={messages}>
              <InternalErrorView />
            </NextIntlClientProvider>
          </RootProviders>
        </body>
      </html>
    );
  }
};
