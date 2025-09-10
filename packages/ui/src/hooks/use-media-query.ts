import { useState, useEffect } from 'react';
import { isClient } from '../lib/utils';

/**
 * Hook for responsive media queries
 * Returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (!isClient()) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!isClient()) return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Set initial state
    setMatches(mediaQuery.matches);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks for common screen sizes
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1440px)');

/**
 * Hook that returns current breakpoint name
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'large-desktop' {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isLargeDesktop = useIsLargeDesktop();

  if (isLargeDesktop) return 'large-desktop';
  if (isDesktop) return 'desktop';
  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  
  // Default fallback
  return 'desktop';
}