import { NextConfig } from 'next';
import VitNodeConfig from 'vitnode-frontend/next.config';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {};

export default withBundleAnalyzer(VitNodeConfig(nextConfig));
