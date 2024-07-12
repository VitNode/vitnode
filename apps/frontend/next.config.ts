import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // TODO: Remove this when the framer-motion issue is fixed for React 19
  reactStrictMode: false,
  experimental: {
    ppr: true,
  },
  output: 'standalone',
  transpilePackages: ['lucide-react', 'vitnode-shared', 'vitnode-frontend'],
};

export default withNextIntl(nextConfig);
