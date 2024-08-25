import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(process.cwd(), '..', '..', '.env'),
});

const withNextIntl = createNextIntlPlugin();

const nextConfig = (config: NextConfig): NextConfig => {
  return {
    ...config,
    devIndicators: {
      appIsrStatus: false,
    },
    env: {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    },
    // TODO: Remove this when the framer-motion issue is fixed for React 19
    reactStrictMode: false,
    experimental: {
      ppr: true,
    },
    output: 'standalone',
    transpilePackages: ['lucide-react', 'vitnode-frontend'],
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8080',
          pathname: '/public/**',
        },
      ],
    },
  };
};

export default function NextConfigDefault(config?: NextConfig): NextConfig {
  return withNextIntl(nextConfig(config || {}));
}
