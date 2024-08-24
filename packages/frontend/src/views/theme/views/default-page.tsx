import { getSessionData } from '@/graphql/get-session-data';
import { Metadata } from 'next';
import React from 'react';

export interface DefaultPageProps {
  params: {
    locale: string;
  };
}

const getDescription = async ({
  locale,
}: {
  locale: DefaultPageProps['params']['locale'];
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
  params: { locale },
}: DefaultPageProps): Promise<Metadata> => {
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

  return <PageFromTheme {...rest} />;
};
