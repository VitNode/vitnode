import { MetadataRoute } from 'next';
import { CONFIG } from 'vitnode-frontend/helpers/config-with-env';
import { getSessionData } from 'vitnode-frontend/graphql/get-session-data';
import { getGlobalData } from 'vitnode-frontend/graphql/get-global-data';

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
    acc[code] = `${frontendUrl}/${code}${slug ? slug(code) : ''}`;

    return acc;
  }, {});
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { core_plugins__show } = await getSessionData();
  const {
    core_languages__show: { edges: languages },
  } = await getGlobalData();
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
