import type { Config } from 'tailwindcss';
import { colors } from './colors';

const tailwindPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: colors.light.background.primary,
          secondary: colors.light.background.secondary,
          tertiary: colors.light.background.tertiary,
        },
        foreground: {
          primary: colors.light.foreground.primary,
          secondary: colors.light.foreground.secondary,
          muted: colors.light.foreground.muted,
        },
        border: {
          DEFAULT: colors.light.border.default,
          muted: colors.light.border.muted,
        },
        accent: {
          DEFAULT: colors.light.accent.primary,
          hover: colors.light.accent.hover,
        },
        destructive: {
          DEFAULT: colors.light.destructive.primary,
          hover: colors.light.destructive.hover,
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: any) {
      // Dark mode color utilities
      addUtilities({
        '.dark': {
          '--color-background-primary': colors.dark.background.primary,
          '--color-background-secondary': colors.dark.background.secondary,
          '--color-background-tertiary': colors.dark.background.tertiary,
          '--color-foreground-primary': colors.dark.foreground.primary,
          '--color-foreground-secondary': colors.dark.foreground.secondary,
          '--color-foreground-muted': colors.dark.foreground.muted,
          '--color-border-default': colors.dark.border.default,
          '--color-border-muted': colors.dark.border.muted,
          '--color-accent-default': colors.dark.accent.primary,
          '--color-accent-hover': colors.dark.accent.hover,
          '--color-destructive-default': colors.dark.destructive.primary,
          '--color-destructive-hover': colors.dark.destructive.hover,
        },
      });

      // Custom semantic color utilities
      addUtilities({
        '.bg-primary': {
          'background-color': colors.light.background.primary,
          '.dark &': { 'background-color': colors.dark.background.primary },
        },
        '.bg-secondary': {
          'background-color': colors.light.background.secondary,
          '.dark &': { 'background-color': colors.dark.background.secondary },
        },
        '.text-primary': {
          color: colors.light.foreground.primary,
          '.dark &': { color: colors.dark.foreground.primary },
        },
        '.text-secondary': {
          color: colors.light.foreground.secondary,
          '.dark &': { color: colors.dark.foreground.secondary },
        },
        '.text-muted': {
          color: colors.light.foreground.muted,
          '.dark &': { color: colors.dark.foreground.muted },
        },
        '.border-default': {
          'border-color': colors.light.border.default,
          '.dark &': { 'border-color': colors.dark.border.default },
        },
      });
    },
  ],
};

export default tailwindPreset;
