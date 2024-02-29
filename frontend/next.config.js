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
  const envBackend =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:8080";
  const backend = {
    hostname: new URL(envBackend).hostname,
    port: new URL(envBackend).port,
    protocol: new URL(envBackend).protocol.replace(":", "")
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
          hostname: "localhost",
          port: "8080",
          protocol: "http"
          // pathname: "/public/**"
        },
        {
          hostname: backend.hostname,
          port: backend.port,
          protocol: backend.protocol,
          pathname: "/public/**"
        }
      ]
    }
  };
};

module.exports = withBundleAnalyzer(withNextIntl(config()));
