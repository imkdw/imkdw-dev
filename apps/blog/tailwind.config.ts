import type { Config } from 'tailwindcss';
import { tailwindPreset } from '@imkdw-dev/ui/tailwind-preset';

const config: Config = {
  presets: [tailwindPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
