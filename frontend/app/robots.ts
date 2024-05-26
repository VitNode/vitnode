import { MetadataRoute } from "next";

import { CONFIG } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/"
    },
    sitemap: `${CONFIG.frontend_url}/sitemap.xml`
  };
}
