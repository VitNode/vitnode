import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { getGlobalData } from '../../graphql/get-global-data';
import { CONFIG } from '../../helpers/config-with-env';
import { InternalErrorView } from '../global';
import { RootProviders } from './providers';
import { WrapperRootLayout } from './wrapper';

export interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

interface Props extends RootLayoutProps {
  className?: string;
}

export const generateMetadataRootLayout = async ({
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
      core_settings__show: { site_name, site_short_name },
    } = await getGlobalData();

    return {
      ...metadata,
      title: {
        default: site_name,
        template: `%s - ${site_short_name}`,
      },
    };
  } catch (_) {
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
}: Props) => {
  const messages = await getMessages({ locale });

  try {
    const middlewareData = await getGlobalData();

    return (
      <WrapperRootLayout className={className} locale={locale}>
        <NextTopLoader
          color="hsl(var(--primary))"
          height={4}
          showSpinner={false}
        />
        <RootProviders middlewareData={middlewareData}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </RootProviders>
      </WrapperRootLayout>
    );
  } catch (_) {
    return (
      <WrapperRootLayout locale={locale}>
        <RootProviders>
          <NextIntlClientProvider messages={messages}>
            <InternalErrorView />
          </NextIntlClientProvider>
        </RootProviders>
      </WrapperRootLayout>
    );
  }
};
