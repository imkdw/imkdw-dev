import { nextJsConfig } from '@imkdw-dev/eslint-config/next-js';

export default [
  ...nextJsConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];