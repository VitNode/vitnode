import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = config => {
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

export default function (config) {
  return withNextIntl(nextConfig(config));
}
