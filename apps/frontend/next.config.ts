import type { NextConfig } from 'next';
import VitNodeConfig from 'vitnode-frontend/next.config';

// @ts-ignore
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default VitNodeConfig(nextConfig);
