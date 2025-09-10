import { useEffect, useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useMediaQuery } from './use-media-query';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook for managing theme state with system preference detection
 * Compatible with next-themes but can work independently
 */
export function useTheme(): UseThemeReturn {
  const [theme, setStoredTheme] = useLocalStorage<Theme>('theme', 'system');
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Resolve the actual theme based on current setting and system preference
  useEffect(() => {
    const resolved: ResolvedTheme = 
      theme === 'system' 
        ? (systemPrefersDark ? 'dark' : 'light')
        : theme as ResolvedTheme;
    
    setResolvedTheme(resolved);
    
    // Apply theme to document root
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove existing theme classes
      root.classList.remove('light', 'dark');
      
      // Add current theme class
      root.classList.add(resolved);
      
      // Set theme-color meta tag for mobile browsers
      const themeColorMeta = document.querySelector('meta[name=\"theme-color\"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute(
          'content',
          resolved === 'dark' ? '#1a202c' : '#ffffff'
        );
      }
    }
  }, [theme, systemPrefersDark]);

  const setTheme = (newTheme: Theme) => {
    setStoredTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      // If system, toggle to opposite of current resolved theme
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}