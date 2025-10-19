import { config } from '@imkdw-dev/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['eslint.config.js', 'dist/**'],
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
