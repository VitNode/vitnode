import type { MetadataRoute } from "next";

import { CONFIG } from "@/config/config";

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
