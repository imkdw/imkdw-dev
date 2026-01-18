/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';
import { colors, shadows, spacing, typography } from './colors';

export const tailwindPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border))',
          hover: 'hsl(var(--border-hover))',
        },
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
          hover: 'hsl(var(--muted-hover))',
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
        terminal: {
          bg: 'hsl(var(--terminal-bg))',
          foreground: 'hsl(var(--terminal-foreground))',
          accent: 'hsl(var(--terminal-accent))',
          warning: 'hsl(var(--terminal-warning))',
          error: 'hsl(var(--terminal-error))',
          success: 'hsl(var(--terminal-success))',
        },
        code: {
          bg: 'hsl(var(--code-bg))',
          foreground: 'hsl(var(--code-foreground))',
          keyword: 'hsl(var(--code-keyword))',
          string: 'hsl(var(--code-string))',
          comment: 'hsl(var(--code-comment))',
          number: 'hsl(var(--code-number))',
          operator: 'hsl(var(--code-operator))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      fontFamily: {
        mono: typography.fontMono.split(', '),
        sans: ['Pretendard', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
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
      boxShadow: {
        'terminal-sm': shadows.light.sm,
        'terminal-md': shadows.light.md,
        'terminal-lg': shadows.light.lg,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function ({ addBase, addUtilities }: { addBase: (base: any) => void; addUtilities: (utilities: any) => void }) {
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
          '--border-hover': colors.light.border.hover,
          '--input': colors.light.border.input,
          '--ring': colors.light.primary.default,
          '--muted-hover': colors.light.muted.hover,
          '--radius': spacing.radius,
          '--terminal-bg': colors.light.terminal.background,
          '--terminal-foreground': colors.light.terminal.foreground,
          '--terminal-accent': colors.light.terminal.accent,
          '--terminal-warning': colors.light.terminal.warning,
          '--terminal-error': colors.light.terminal.error,
          '--terminal-success': colors.light.terminal.success,
          '--code-bg': colors.light.terminal.code.background,
          '--code-foreground': colors.light.terminal.code.foreground,
          '--code-keyword': colors.light.terminal.code.keyword,
          '--code-string': colors.light.terminal.code.string,
          '--code-comment': colors.light.terminal.code.comment,
          '--code-number': colors.light.terminal.code.number,
          '--code-operator': colors.light.terminal.code.operator,
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
          '--border-hover': colors.dark.border.hover,
          '--input': colors.dark.border.input,
          '--ring': colors.dark.primary.default,
          '--muted-hover': colors.dark.muted.hover,
          '--terminal-bg': colors.dark.terminal.background,
          '--terminal-foreground': colors.dark.terminal.foreground,
          '--terminal-accent': colors.dark.terminal.accent,
          '--terminal-warning': colors.dark.terminal.warning,
          '--terminal-error': colors.dark.terminal.error,
          '--terminal-success': colors.dark.terminal.success,
          '--code-bg': colors.dark.terminal.code.background,
          '--code-foreground': colors.dark.terminal.code.foreground,
          '--code-keyword': colors.dark.terminal.code.keyword,
          '--code-string': colors.dark.terminal.code.string,
          '--code-comment': colors.dark.terminal.code.comment,
          '--code-number': colors.dark.terminal.code.number,
          '--code-operator': colors.dark.terminal.code.operator,
        },
      });

      addUtilities({
        // Terminal styles
        '.terminal-content': {
          background: 'hsl(var(--terminal-bg))',
          color: 'hsl(var(--terminal-foreground))',
        },
        '.terminal-prompt': {
          display: 'flex',
          'align-items': 'center',
          gap: '0.5rem',
          'font-size': '0.875rem',
        },
        '.prompt-symbol': {
          color: 'hsl(var(--primary))',
          'font-weight': 'bold',
        },
        '.prompt-path': {
          color: 'hsl(var(--terminal-accent))',
        },
        '.control-dot': {
          width: '0.75rem',
          height: '0.75rem',
          'border-radius': '50%',
          border: '1px solid rgba(0, 0, 0, 0.2)',
        },
        '.control-dot.close': {
          background: 'hsl(var(--destructive))',
        },
        '.control-dot.minimize': {
          background: 'hsl(var(--terminal-warning))',
        },
        '.control-dot.maximize': {
          background: 'hsl(var(--terminal-success))',
        },
        '.syntax-keyword': {
          color: 'hsl(var(--code-keyword))',
        },
        '.syntax-string': {
          color: 'hsl(var(--code-string))',
        },
        '.syntax-comment': {
          color: 'hsl(var(--code-comment))',
        },
        '.syntax-number': {
          color: 'hsl(var(--code-number))',
        },
        '.syntax-operator': {
          color: 'hsl(var(--code-operator))',
        },
        '.smooth-transition': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      });
    },
  ],
};
