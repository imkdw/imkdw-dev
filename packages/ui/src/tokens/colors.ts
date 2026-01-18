export const colors = {
  light: {
    background: {
      primary: '220 14% 96%',
      secondary: '220 13% 91%',
      tertiary: '220 13% 93%',
      card: '0 0% 100%',
      popover: '0 0% 100%',
    },
    foreground: {
      primary: '220 13% 18%',
      secondary: '220 13% 25%',
      muted: '220 9% 40%',
    },
    muted: {
      hover: '220 13% 85%',
    },
    border: {
      default: '220 13% 80%',
      input: '220 13% 75%',
      hover: '220 13% 65%',
    },
    accent: {
      primary: '197 71% 45%',
      foreground: '0 0% 100%',
      hover: '197 71% 35%',
    },
    primary: {
      default: '142 76% 32%',
      foreground: '0 0% 100%',
      hover: '142 76% 22%',
    },
    destructive: {
      primary: '0 84% 55%',
      foreground: '0 0% 100%',
      hover: '0 84% 45%',
    },
    terminal: {
      background: '220 14% 96%',
      header: '220 13% 91%',
      border: '220 13% 75%',
      foreground: '142 80% 22%',
      text: '220 13% 15%',
      accent: '197 80% 32%',
      warning: '45 100% 32%',
      error: '0 84% 45%',
      success: '142 80% 22%',
      code: {
        background: '220 14% 96%',
        foreground: '220 13% 15%',
        keyword: '197 80% 32%',
        string: '142 80% 22%',
        comment: '220 9% 40%',
        number: '45 100% 32%',
        operator: '0 84% 45%',
      },
    },
  },
  dark: {
    background: {
      primary: '220 13% 18%',
      secondary: '215 25% 27%',
      tertiary: '215 25% 27%',
      card: '215 25% 27%',
      popover: '220 13% 18%',
    },
    foreground: {
      primary: '142 76% 36%',
      secondary: '142 76% 36%',
      muted: '220 9% 61%',
    },
    muted: {
      hover: '215 25% 32%',
    },
    border: {
      default: '215 25% 27%',
      input: '215 25% 27%',
      hover: '215 25% 35%',
    },
    accent: {
      primary: '197 71% 52%',
      foreground: '220 13% 18%',
      hover: '197 71% 62%',
    },
    primary: {
      default: '142 76% 36%',
      foreground: '220 13% 18%',
      hover: '142 76% 46%',
    },
    destructive: {
      primary: '0 84% 60%',
      foreground: '0 0% 100%',
      hover: '0 84% 70%',
    },
    terminal: {
      background: '220 13% 18%',
      header: '215 25% 27%',
      border: '215 25% 27%',
      foreground: '142 76% 36%',
      text: '220 14% 71%',
      accent: '197 71% 52%',
      warning: '48 96% 53%',
      error: '0 84% 60%',
      success: '142 76% 36%',
      code: {
        background: '215 25% 27%',
        foreground: '142 76% 36%',
        keyword: '197 71% 52%',
        string: '142 76% 36%',
        comment: '220 9% 61%',
        number: '48 96% 53%',
        operator: '0 84% 60%',
      },
    },
  },
} as const;

export const shadows = {
  light: {
    sm: '0 1px 3px 0 hsl(220 13% 18% / 0.1)',
    md: '0 4px 12px -2px hsl(220 13% 18% / 0.15)',
    lg: '0 20px 25px -5px hsl(220 13% 18% / 0.1), 0 10px 10px -5px hsl(220 13% 18% / 0.04)',
  },
  dark: {
    sm: '0 1px 3px 0 hsl(0 0% 0% / 0.3)',
    md: '0 4px 12px -2px hsl(0 0% 0% / 0.4)',
    lg: '0 20px 25px -5px hsl(0 0% 0% / 0.5), 0 10px 10px -5px hsl(0 0% 0% / 0.1)',
  },
} as const;

export const spacing = {
  radius: '0.5rem',
} as const;

export const typography = {
  fontMono: "Pretendard, 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
} as const;

export const hsl = (color: string) => `hsl(${color})`;
