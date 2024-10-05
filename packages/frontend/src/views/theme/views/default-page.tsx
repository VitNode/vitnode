import { getSessionData } from '@/graphql/get-session-data';
import { Metadata } from 'next';

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
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> => {
  const { locale } = await params;

  return {
    description: await getDescription({ locale }),
  };
};
