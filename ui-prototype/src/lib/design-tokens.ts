/**
 * Design Token System
 * Extracted from the terminal-inspired theme used throughout the application
 * All colors are in HSL format to match Tailwind CSS custom properties
 */

export const colors = {
  light: {
    background: {
      primary: '210 11% 96%',        // --background
      secondary: '210 11% 90%',      // --secondary
      tertiary: '210 11% 93%',       // --muted
      card: '0 0% 100%',             // --card
      popover: '0 0% 100%',          // --popover
    },
    foreground: {
      primary: '220 13% 18%',        // --foreground
      secondary: '220 13% 18%',      // --card-foreground
      muted: '220 9% 46%',           // --muted-foreground
    },
    border: {
      default: '220 13% 91%',        // --border
      input: '220 13% 91%',          // --input
    },
    accent: {
      primary: '197 71% 52%',        // --accent
      foreground: '0 0% 100%',       // --accent-foreground
    },
    primary: {
      default: '142 76% 36%',        // --primary (terminal green)
      foreground: '0 0% 100%',       // --primary-foreground
    },
    destructive: {
      primary: '0 84% 60%',          // --destructive
      foreground: '0 0% 100%',       // --destructive-foreground
    },
    terminal: {
      background: '220 13% 18%',     // --terminal-bg
      foreground: '142 76% 36%',     // --terminal-foreground
      accent: '197 71% 52%',         // --terminal-accent
      warning: '48 96% 53%',         // --terminal-warning
      error: '0 84% 60%',            // --terminal-error
      code: {
        background: '220 13% 18%',   // --code-bg
        foreground: '220 14% 96%',   // --code-foreground
      },
    },
    sidebar: {
      background: '0 0% 98%',        // --sidebar-background
      foreground: '240 5.3% 26.1%', // --sidebar-foreground
      primary: '240 5.9% 10%',       // --sidebar-primary
      accent: '240 4.8% 95.9%',      // --sidebar-accent
      border: '220 13% 91%',         // --sidebar-border
    },
  },
  dark: {
    background: {
      primary: '220 13% 18%',        // --background (dark)
      secondary: '215 25% 27%',      // --secondary (dark)
      tertiary: '215 25% 27%',       // --muted (dark)
      card: '215 25% 27%',           // --card (dark)
      popover: '220 13% 18%',        // --popover (dark)
    },
    foreground: {
      primary: '142 76% 36%',        // --foreground (dark)
      secondary: '142 76% 36%',      // --card-foreground (dark)
      muted: '220 9% 61%',           // --muted-foreground (dark)
    },
    border: {
      default: '215 25% 27%',        // --border (dark)
      input: '215 25% 27%',          // --input (dark)
    },
    accent: {
      primary: '197 71% 52%',        // --accent (dark)
      foreground: '220 13% 18%',     // --accent-foreground (dark)
    },
    primary: {
      default: '142 76% 36%',        // --primary (dark)
      foreground: '220 13% 18%',     // --primary-foreground (dark)
    },
    destructive: {
      primary: '0 84% 60%',          // --destructive (dark)
      foreground: '0 0% 100%',       // --destructive-foreground (dark)
    },
    terminal: {
      background: '220 13% 18%',     // --terminal-bg (dark)
      foreground: '142 76% 36%',     // --terminal-foreground (dark)
      accent: '197 71% 52%',         // --terminal-accent (dark)
      warning: '48 96% 53%',         // --terminal-warning (dark)
      error: '0 84% 60%',            // --terminal-error (dark)
      code: {
        background: '215 25% 27%',   // --code-bg (dark)
        foreground: '142 76% 36%',   // --code-foreground (dark)
      },
    },
    sidebar: {
      background: '215 25% 27%',     // --sidebar-background (dark)
      foreground: '142 76% 36%',     // --sidebar-foreground (dark)
      primary: '142 76% 36%',        // --sidebar-primary (dark)
      accent: '215 25% 27%',         // --sidebar-accent (dark)
      border: '215 25% 27%',         // --sidebar-border (dark)
    },
  },
} as const;

export const gradients = {
  light: {
    hero: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(197 71% 52%) 100%)',
    card: 'linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(210 11% 98%) 100%)',
    terminal: 'linear-gradient(135deg, hsl(220 13% 18%) 0%, hsl(215 25% 27%) 100%)',
  },
  dark: {
    hero: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(197 71% 52%) 100%)',
    card: 'linear-gradient(145deg, hsl(215 25% 27%) 0%, hsl(220 13% 18%) 100%)',
    terminal: 'linear-gradient(135deg, hsl(220 13% 18%) 0%, hsl(215 25% 27%) 100%)',
  },
} as const;

export const shadows = {
  light: {
    sm: '0 1px 3px 0 hsl(220 13% 18% / 0.1)',
    md: '0 4px 12px -2px hsl(220 13% 18% / 0.15)',
    lg: '0 20px 25px -5px hsl(220 13% 18% / 0.1), 0 10px 10px -5px hsl(220 13% 18% / 0.04)',
    glow: '0 0 30px hsl(142 76% 36% / 0.4)',
    terminal: 'inset 0 1px 0 hsl(220 43% 11% / 0.1), 0 1px 3px hsl(220 13% 18% / 0.1)',
  },
  dark: {
    sm: '0 1px 3px 0 hsl(0 0% 0% / 0.3)',
    md: '0 4px 12px -2px hsl(0 0% 0% / 0.4)',
    lg: '0 20px 25px -5px hsl(0 0% 0% / 0.5), 0 10px 10px -5px hsl(0 0% 0% / 0.1)',
    glow: '0 0 30px hsl(142 76% 36% / 0.5)',
    terminal: 'inset 0 1px 0 hsl(220 43% 11% / 0.3), 0 1px 3px hsl(0 0% 0% / 0.3)',
  },
} as const;

export const spacing = {
  radius: '0.5rem',
} as const;

export const typography = {
  fontMono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
} as const;

// Window control colors
export const windowControls = {
  close: '0 84% 60%',      // Red
  minimize: '48 96% 53%',  // Yellow  
  maximize: '142 76% 36%', // Green (primary)
} as const;

// Utility function to get color value with HSL wrapper
export const hsl = (color: string) => `hsl(${color})`;

// Type definitions for better TypeScript support
export type ColorTheme = 'light' | 'dark';
export type ColorCategory = keyof typeof colors.light;
export type ColorVariant<T extends ColorCategory> = keyof typeof colors.light[T];