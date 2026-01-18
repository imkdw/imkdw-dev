'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '../lib/utils';

interface Props {
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 400, className }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex h-12 w-12 items-center justify-center',
        'rounded-full border border-border bg-card shadow-lg',
        'text-foreground transition-all duration-300',
        'hover:bg-accent hover:shadow-xl hover:-translate-y-0.5',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'animate-fade-in',
        className
      )}
      aria-label="Scroll to top"
      type="button"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
