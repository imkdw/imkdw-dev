import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
};

export default nextConfig;
