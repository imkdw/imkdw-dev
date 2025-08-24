// @ts-check
import { nestjsConfig } from '../../packages/eslint-config/nestjs.js';

export default [
  ...nestjsConfig,
  {
    ignores: ['eslint.config.mjs', 'dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];