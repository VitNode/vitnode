import { MetadataRoute } from "next";
import { CONFIG } from "vitnode-frontend/helpers";

import { getSessionData } from "@/graphql/get-session-data";

const generateAlternateLanguagesForSitemap = ({
  frontendUrl,
  languages,
  slug,
}: {
  frontendUrl: string;
  languages: { code: string }[];
  slug?: (locale: string) => string;
}): Record<string, string> => {
  return languages.reduce((acc: Record<string, string>, { code }) => {
    acc[code] = `${frontendUrl}/${code}${slug ? slug(code) : ""}`;

    return acc;
  }, {});
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: {
      core_languages__show: { edges: languages },
      core_plugins__show,
    },
  } = await getSessionData();
  const plugins = core_plugins__show.filter(item => item.allow_default);

  const data = plugins.map(plugin => {
    return {
      url: `${CONFIG.frontend_url}/${plugin.code}`,
      lastModified: new Date(),
      alternates: {
        languages: generateAlternateLanguagesForSitemap({
          languages,
          frontendUrl: CONFIG.frontend_url,
          slug: () => `/${plugin.code}`,
        }),
      },
    };
  });

  return [
    {
      url: CONFIG.frontend_url,
      lastModified: new Date(),
      alternates: {
        languages: generateAlternateLanguagesForSitemap({
          languages,
          frontendUrl: CONFIG.frontend_url,
        }),
      },
    },
    ...data,
  ];
}
