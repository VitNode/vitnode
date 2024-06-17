import * as React from "react";
import { Metadata } from "next";

import { getSessionData } from "@/graphql/get-session-data";

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
  const { default_plugin } = await getSessionData();
  const PageFromTheme: React.LazyExoticComponent<() => JSX.Element> =
    React.lazy(
      async () =>
        import(`../../../plugins/${default_plugin}/templates/default-page`)
    );

  return <PageFromTheme />;
}
