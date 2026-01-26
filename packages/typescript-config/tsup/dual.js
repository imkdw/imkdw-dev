// @ts-check
import { defineConfig } from 'tsup';

const isWatch = process.argv.includes('--watch');

/** @type {import('tsup').Options} */
export const dualConfig = {
  format: ['esm', 'cjs'],
  dts: true,
  clean: !isWatch,
  sourcemap: true,
  target: 'es2022',
  outDir: 'dist',
  entry: ['src/index.ts'],
};

export default defineConfig(dualConfig);
