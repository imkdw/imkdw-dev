import path from 'path';

import dotenv from 'dotenv';

import type { NextConfig } from 'next';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
