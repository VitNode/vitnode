import type { NextConfig } from 'next';
import VitNodeConfig from 'vitnode-frontend/next.config';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// @ts-ignore
const nextConfig: NextConfig = withBundleAnalyzer({
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
});

export default VitNodeConfig(nextConfig);
