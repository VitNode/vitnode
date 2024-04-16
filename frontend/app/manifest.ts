import type { MetadataRoute } from "next";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Metadata,
  type Core_MetadataQuery,
  type Core_MetadataQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Core_MetadataQuery,
    Core_MetadataQueryVariables
  >({
    query: Core_Metadata
  });

  return data;
};

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { core_settings__show: data } = await getData();

  return {
    name: data.site_name,
    short_name: data.site_short_name,
    description: "Next.js App",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icons/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ]
  };
}
