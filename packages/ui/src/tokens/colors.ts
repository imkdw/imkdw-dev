export const colors = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    foreground: {
      primary: '#0f172a',
      secondary: '#334155',
      muted: '#64748b',
    },
    border: {
      default: '#e2e8f0',
      muted: '#f1f5f9',
    },
    accent: {
      primary: '#3b82f6',
      hover: '#2563eb',
    },
    destructive: {
      primary: '#ef4444',
      hover: '#dc2626',
    },
  },
  dark: {
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
    },
    foreground: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#94a3b8',
    },
    border: {
      default: '#334155',
      muted: '#1e293b',
    },
    accent: {
      primary: '#60a5fa',
      hover: '#3b82f6',
    },
    destructive: {
      primary: '#f87171',
      hover: '#ef4444',
    },
  },
} as const;
