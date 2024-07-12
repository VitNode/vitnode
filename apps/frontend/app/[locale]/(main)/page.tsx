import React from 'react';
import { Metadata } from 'next';
import { getSessionData } from 'vitnode-frontend/graphql/get-session-data';

interface Props {
  params: {
    locale: string;
  };
}

const getDescription = async ({
  locale,
}: {
  locale: Props['params']['locale'];
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

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  return {
    description: await getDescription({ locale }),
  };
}

export default async function Page() {
  const {
    core_sessions__authorization: { plugin_default },
  } = await getSessionData();
  const PageFromTheme: React.LazyExoticComponent<() => JSX.Element> =
    React.lazy(
      async () =>
        import(`../../../plugins/${plugin_default}/templates/default-page`),
    );

  return <PageFromTheme />;
}
