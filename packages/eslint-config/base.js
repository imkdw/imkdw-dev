import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      'no-console': 'error',
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'import/newline-after-import': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
  {
    ignores: ['dist/**', 'build/**', '.next/**', 'node_modules/**', '*.config.ts', '*.config.js', '*.config.mjs'],
  },
];
