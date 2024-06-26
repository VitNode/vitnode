import { MetadataRoute } from "next";
import { CONFIG } from "vitnode-frontend/helpers/config-with-env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${CONFIG.frontend_url}/sitemap.xml`,
  };
}
