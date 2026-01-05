import path from 'path';

import dotenv from 'dotenv';

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withNextIntl(nextConfig);
