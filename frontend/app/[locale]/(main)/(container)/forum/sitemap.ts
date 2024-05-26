import { MetadataRoute } from "next";

import { CONFIG } from "@/config";
import { getSessionData } from "@/functions/get-session-data";
import { generateAlternateLanguages } from "@/functions/sitemap";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show__Sitemap,
  Forum_Forums__Show__SitemapQuery,
  Forum_Forums__Show__SitemapQueryVariables
} from "@/graphql/hooks";
import { getConvertNameToLink, getTextLang } from "@/hooks/core/use-text-lang";

const getData = async () => {
  const { data } = await fetcher<
    Forum_Forums__Show__SitemapQuery,
    Forum_Forums__Show__SitemapQueryVariables
  >({
    query: Forum_Forums__Show__Sitemap,
    variables: {
      lastPostsArgs: {
        last: 1
      }
    }
  });

  return data;
};

interface Props {
  params: {
    locale: string;
  };
}

export default async function sitemap({
  params: { locale }
}: Props): Promise<MetadataRoute.Sitemap> {
  const { convertNameToLink } = getTextLang({ locale });
  const [session, forums] = await Promise.all([getSessionData(), getData()]);
  const {
    data: {
      core_languages__show: { edges: languages }
    }
  } = session;

  return forums.forum_forums__show.edges.map(forum => ({
    url: `${CONFIG.frontend_url}/forum/${convertNameToLink({ name: forum.name, id: forum.id })}`,
    lastModified: forum.last_posts.edges[0]?.created,
    alternates: {
      languages: generateAlternateLanguages({
        languages,
        frontendUrl: CONFIG.frontend_url,
        slug: locale =>
          `/forum/${getConvertNameToLink({ id: forum.id, name: forum.name, locale })}`
      })
    }
  }));
}
