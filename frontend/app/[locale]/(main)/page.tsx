import { lazy, type LazyExoticComponent } from "react";
import type { Metadata } from "next";

import { getSessionData } from "@/functions/get-session-data";

interface Props {
  params: {
    locale: string;
  };
}

const getDescription = async ({
  locale
}: {
  locale: Props["params"]["locale"];
}): Promise<string> => {
  const {
    data: {
      core_settings__show: { site_description }
    }
  } = await getSessionData();

  const textFromLang = site_description.find(t => t.language_code === locale);

  if (textFromLang) {
    return textFromLang.value;
  }

  return site_description[0]?.value ?? "";
};

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  return {
    description: await getDescription({ locale })
  };
}

export default async function Page() {
  const { default_plugin, theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<() => JSX.Element> = lazy(() =>
    import(`@/themes/${theme_id}/${default_plugin}/default-page`).catch(
      () => import(`@/themes/1/${default_plugin}/default-page`)
    )
  );

  return <PageFromTheme />;
}
