import createBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = createBundleAnalyzer({
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

  /** @type {import('next').NextConfig} */
  return {
    // TODO: Remove this when the framer-motion issue is fixed for React 19
    reactStrictMode: false,
    logging: {
      fetches: {
        fullUrl: true
      }
    },
    experimental: {
      ppr: true,
      reactCompiler: true
    },
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
          port: "8080",
          protocol: "http",
          pathname: "/public/**"
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

export default withBundleAnalyzer(withNextIntl(config()));
