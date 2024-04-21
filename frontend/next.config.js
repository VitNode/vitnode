/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const config = () => {
  const envFrontend =
    process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";
  const frontend = {
    hostname: new URL(envFrontend).hostname,
    port: new URL(envFrontend).port,
    protocol: new URL(envFrontend).protocol.replace(":", "")
  };

  return {
    // logging: {
    //   fetches: {
    //     fullUrl: true
    //   }
    // },
    output: "standalone",
    transpilePackages: ["lucide-react"],
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          hostname: "*",
          port: ""
        },
        {
          hostname: "localhost",
          port: "3000",
          protocol: "http"
          // pathname: "/uploads/**"
        },
        {
          hostname: frontend.hostname,
          port: frontend.port,
          protocol: frontend.protocol,
          pathname: "/uploads/**"
        }
      ]
    }
  };
};

module.exports = withBundleAnalyzer(withNextIntl(config()));
