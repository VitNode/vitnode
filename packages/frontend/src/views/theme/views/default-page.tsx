import { TranslationsProvider } from '@/components/translations-provider';
import { getSessionData } from '@/graphql/get-session-data';
import { Metadata } from 'next';
import React from 'react';

export interface DefaultPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const getDescription = async ({
  locale,
}: {
  locale: string;
}): Promise<string> => {
  const {
    core_settings__show: { site_description },
  } = await getSessionData();

  const textFromLang = site_description.find(t => t.language_code === locale);

  if (textFromLang) {
    return textFromLang.value;
  }

  return site_description[0]?.value ?? '';
};

export const generateMetadataDefaultPage = async ({
  params,
}: DefaultPageProps): Promise<Metadata> => {
  const { locale } = await params;

  return {
    description: await getDescription({ locale }),
  };
};

interface Props extends DefaultPageProps {
  pathToDefaultPage: (
    plugin: string,
  ) => Promise<{ default: React.ComponentType<DefaultPageProps> }>;
}

export const DefaultPage = async ({ pathToDefaultPage, ...rest }: Props) => {
  const {
    core_sessions__authorization: { plugin_default },
  } = await getSessionData();

  const PageFromTheme = React.lazy(async () =>
    pathToDefaultPage(plugin_default).then(module => ({
      default: module.default,
    })),
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <TranslationsProvider namespaces={`${plugin_default}.home`}>
      <PageFromTheme {...rest} />
    </TranslationsProvider>
  );
};
