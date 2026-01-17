import path from 'path';

import dotenv from 'dotenv';

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Bundle Analyzer 설정 (조건부 로드)
 
let withBundleAnalyzer: (config: NextConfig) => NextConfig = config => config;
if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bundleAnalyzer = require('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzer({
    enabled: true,
    openAnalyzer: true,
  });
}

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
