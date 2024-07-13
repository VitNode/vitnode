import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = (config: NextConfig): NextConfig => {
  return {
    ...config,
    // TODO: Remove this when the framer-motion issue is fixed for React 19
    reactStrictMode: false,
    experimental: {
      ppr: true,
    },
    output: 'standalone',
    transpilePackages: ['lucide-react', 'vitnode-shared', 'vitnode-frontend'],
  };
};

export default function (config: NextConfig): NextConfig {
  return withNextIntl(nextConfig(config));
}
