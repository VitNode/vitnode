/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(
  withNextIntl({
    output: 'standalone',
    transpilePackages: ['lucide-react'],
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          hostname: 'localhost',
          port: '8080',
          protocol: 'http',
          pathname: '/public/**'
        }
      ]
    }
  })
);
