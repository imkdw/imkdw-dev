import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      
      // Enforce Next.js image optimization
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      
      // React scope no longer necessary with new JSX transform
      "react/react-in-jsx-scope": "off",
      
      // Strict React Hooks dependency array checking
      "react-hooks/exhaustive-deps": "error",
      
      // React specific strict rules
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // Not needed with new JSX transform
      "react/jsx-uses-vars": "error",
      "react/no-danger-with-children": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-is-mounted": "error",
      "react/no-typos": "error",
      "react/require-render-return": "error",
      "react/style-prop-object": "error",
      
      // Console allowed in development but should be warnings for client-side
      "no-console": "warn",
    },
  },
];
