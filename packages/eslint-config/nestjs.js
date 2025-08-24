import globals from "globals";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for NestJS applications.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nestjsConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // NestJS specific rules - allow decorators
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      
      // Allow console in development/debugging
      "no-console": "warn",
      
      // NestJS commonly uses classes with decorators
      "@typescript-eslint/no-extraneous-class": "off",
      
      // Allow empty constructors for dependency injection
      "@typescript-eslint/no-useless-constructor": "off",
      
      // NestJS often requires parameter properties
      "@typescript-eslint/parameter-properties": "off",
    },
  },
];