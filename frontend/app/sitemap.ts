import type { MetadataRoute } from "next";

import { CONFIG } from "@/config";
import { getSessionData } from "@/functions/get-session-data";
import { generateAlternateLanguages } from "@/functions/sitemap";

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
          frontendUrl: CONFIG.frontend_url,
          slug: () => `/${plugin.code}`
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
          frontendUrl: CONFIG.frontend_url
        })
      }
    },
    ...data
  ];
}
