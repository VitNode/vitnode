import { TranslationsProvider } from '@/components/translations-provider';
import { Metadata } from 'next';
import React from 'react';

import { getGlobalData } from '../../graphql/get-global-data';
import { CONFIG } from '../../helpers/config-with-env';
import { InternalErrorView } from '../global';
import { RootProviders } from './providers';
import { WrapperRootLayout } from './wrapper';

interface Props {
  children: React.ReactNode;
  className?: string;
  params: Promise<{ locale: string }>;
}

export const generateMetadataRootLayout = async ({
  params,
}: Omit<Props, 'className'>): Promise<Metadata> => {
  const { locale } = await params;
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
      openGraph: {
        title: site_name,
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

export const RootLayout = async ({ children, params, className }: Props) => {
  const { locale } = await params;
  try {
    const middlewareData = await getGlobalData();

    return (
      <WrapperRootLayout className={className} locale={locale}>
        <RootProviders middlewareData={middlewareData}>
          <TranslationsProvider namespaces={[]}>
            {children}
          </TranslationsProvider>
        </RootProviders>
      </WrapperRootLayout>
    );
  } catch (_) {
    return (
      <WrapperRootLayout locale={locale}>
        <RootProviders>
          <TranslationsProvider namespaces={[]}>
            <InternalErrorView />
          </TranslationsProvider>
        </RootProviders>
      </WrapperRootLayout>
    );
  }
};
