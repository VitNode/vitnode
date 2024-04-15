import type { MetadataRoute } from "next";

import { CONFIG } from "@/config";
import { getSessionData } from "@/functions/get-session-data";

const generateAlternateLanguages = ({
  languages,
  url
}: {
  languages: { code: string }[];
  url: string;
}): { [lang: string]: string } => {
  return languages.reduce((acc: { [lang: string]: string }, { code }) => {
    acc[code] = `${url}/${code}`;

    return acc;
  }, {});
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    data: {
      core_languages__show: { edges: languages },
      core_plugins__show
    }
  } = await getSessionData();
  const plugins = core_plugins__show.filter(item => item.allow_default);

  const data = plugins.map(plugin => {
    return {
      url: `${CONFIG.frontend_url}/${plugin.code}`,
      lastModified: new Date(),
      alternates: {
        languages: generateAlternateLanguages({
          languages,
          url: `${CONFIG.frontend_url}/${plugin.code}`
        })
      }
    };
  });

  return [
    {
      url: CONFIG.frontend_url,
      lastModified: new Date(),
      alternates: {
        languages: generateAlternateLanguages({
          languages,
          url: CONFIG.frontend_url
        })
      }
    },
    ...data
  ];
}
