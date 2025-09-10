import type { Config } from 'tailwindcss';
import { colors, gradients, shadows, spacing, typography } from './colors';

/**
 * Terminal-inspired Tailwind CSS Preset
 * Unified design system with HSL-based color tokens
 * Supports both light and dark themes with CSS custom properties
 */
const tailwindPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // HSL-based color system using CSS custom properties
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // Terminal-specific colors
        terminal: {
          bg: 'hsl(var(--terminal-bg))',
          foreground: 'hsl(var(--terminal-foreground))',
          accent: 'hsl(var(--terminal-accent))',
          warning: 'hsl(var(--terminal-warning))',
          error: 'hsl(var(--terminal-error))',
        },
      },
      // Border radius system
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      // Typography
      fontFamily: {
        mono: typography.fontMono.split(', '),
      },
      // Enhanced animations for developer theme
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'terminal-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1s infinite',
      },
      // Enhanced box shadows
      boxShadow: {
        'terminal-sm': shadows.light.sm,
        'terminal-md': shadows.light.md,
        'terminal-lg': shadows.light.lg,
        'terminal-glow': shadows.light.glow,
        'terminal-inset': shadows.light.terminal,
      },
    },
  },
  plugins: [
    // CSS custom properties plugin for theme switching
    function ({ addBase, addUtilities }: any) {
      // Base CSS custom properties for light theme
      addBase({
        ':root': {
          '--background': colors.light.background.primary,
          '--foreground': colors.light.foreground.primary,
          '--card': colors.light.background.card,
          '--card-foreground': colors.light.foreground.secondary,
          '--popover': colors.light.background.popover,
          '--popover-foreground': colors.light.foreground.primary,
          '--primary': colors.light.primary.default,
          '--primary-foreground': colors.light.primary.foreground,
          '--secondary': colors.light.background.secondary,
          '--secondary-foreground': colors.light.foreground.primary,
          '--muted': colors.light.background.tertiary,
          '--muted-foreground': colors.light.foreground.muted,
          '--accent': colors.light.accent.primary,
          '--accent-foreground': colors.light.accent.foreground,
          '--destructive': colors.light.destructive.primary,
          '--destructive-foreground': colors.light.destructive.foreground,
          '--border': colors.light.border.default,
          '--input': colors.light.border.input,
          '--ring': colors.light.primary.default,
          '--radius': spacing.radius,
          // Terminal-specific variables
          '--terminal-bg': colors.light.terminal.background,
          '--terminal-foreground': colors.light.terminal.foreground,
          '--terminal-accent': colors.light.terminal.accent,
          '--terminal-warning': colors.light.terminal.warning,
          '--terminal-error': colors.light.terminal.error,
          '--code-bg': colors.light.terminal.code.background,
          '--code-foreground': colors.light.terminal.code.foreground,
          // Sidebar variables
          '--sidebar-background': colors.light.sidebar.background,
          '--sidebar-foreground': colors.light.sidebar.foreground,
          '--sidebar-primary': colors.light.sidebar.primary,
          '--sidebar-primary-foreground': colors.light.sidebar['primary-foreground'],
          '--sidebar-accent': colors.light.sidebar.accent,
          '--sidebar-accent-foreground': colors.light.sidebar['accent-foreground'],
          '--sidebar-border': colors.light.sidebar.border,
          '--sidebar-ring': colors.light.sidebar.ring,
        },
        '.dark': {
          '--background': colors.dark.background.primary,
          '--foreground': colors.dark.foreground.primary,
          '--card': colors.dark.background.card,
          '--card-foreground': colors.dark.foreground.secondary,
          '--popover': colors.dark.background.popover,
          '--popover-foreground': colors.dark.foreground.primary,
          '--primary': colors.dark.primary.default,
          '--primary-foreground': colors.dark.primary.foreground,
          '--secondary': colors.dark.background.secondary,
          '--secondary-foreground': colors.dark.foreground.primary,
          '--muted': colors.dark.background.tertiary,
          '--muted-foreground': colors.dark.foreground.muted,
          '--accent': colors.dark.accent.primary,
          '--accent-foreground': colors.dark.accent.foreground,
          '--destructive': colors.dark.destructive.primary,
          '--destructive-foreground': colors.dark.destructive.foreground,
          '--border': colors.dark.border.default,
          '--input': colors.dark.border.input,
          '--ring': colors.dark.primary.default,
          // Terminal-specific variables (dark)
          '--terminal-bg': colors.dark.terminal.background,
          '--terminal-foreground': colors.dark.terminal.foreground,
          '--terminal-accent': colors.dark.terminal.accent,
          '--terminal-warning': colors.dark.terminal.warning,
          '--terminal-error': colors.dark.terminal.error,
          '--code-bg': colors.dark.terminal.code.background,
          '--code-foreground': colors.dark.terminal.code.foreground,
          // Sidebar variables (dark)
          '--sidebar-background': colors.dark.sidebar.background,
          '--sidebar-foreground': colors.dark.sidebar.foreground,
          '--sidebar-primary': colors.dark.sidebar.primary,
          '--sidebar-primary-foreground': colors.dark.sidebar['primary-foreground'],
          '--sidebar-accent': colors.dark.sidebar.accent,
          '--sidebar-accent-foreground': colors.dark.sidebar['accent-foreground'],
          '--sidebar-border': colors.dark.sidebar.border,
          '--sidebar-ring': colors.dark.sidebar.ring,
        },
      });

      // Terminal-inspired utility classes
      addUtilities({
        '.terminal-window': {
          '@apply rounded-lg border border-border overflow-hidden': {},
          background: gradients.light.terminal,
          'box-shadow': shadows.light.terminal,
          '.dark &': {
            background: gradients.dark.terminal,
            'box-shadow': shadows.dark.terminal,
          },
        },
        '.terminal-header': {
          '@apply flex items-center justify-between p-3 border-b border-border/50': {},
          background: 'linear-gradient(to bottom, hsl(var(--muted)), hsl(var(--muted) / 0.8))',
        },
        '.terminal-content': {
          '@apply p-4': {},
          'background-color': 'hsl(var(--terminal-bg))',
          color: 'hsl(var(--terminal-foreground))',
          'font-family': typography.fontMono,
        },
        '.code-card': {
          '@apply rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-lg': {},
          background: gradients.light.card,
          'box-shadow': shadows.light.md,
          '.dark &': {
            background: gradients.dark.card,
            'box-shadow': shadows.dark.md,
          },
        },
        '.code-card:hover': {
          'box-shadow': shadows.light.lg,
          transform: 'translateY(-2px)',
          '.dark &': {
            'box-shadow': shadows.dark.lg,
          },
        },
        '.terminal-glow': {
          'box-shadow': shadows.light.glow,
          '.dark &': {
            'box-shadow': shadows.dark.glow,
          },
        },
      });
    },
  ],
};

export default tailwindPreset;
