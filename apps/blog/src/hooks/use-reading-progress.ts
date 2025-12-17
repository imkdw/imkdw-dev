'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ReadingProgressState {
  progress: number;
  isVisible: boolean;
}

const DEFAULT_TARGET_SELECTOR = '.milkdown';

export function useReadingProgress(targetSelector: string = DEFAULT_TARGET_SELECTOR): ReadingProgressState {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback(() => {
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      setIsVisible(false);
      setProgress(0);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const contentHeight = rect.height;

    if (contentHeight <= viewportHeight) {
      setIsVisible(false);
      setProgress(0);
      return;
    }

    const scrollableDistance = contentHeight - viewportHeight;
    const scrolledDistance = -rect.top;

    let calculatedProgress = (scrolledDistance / scrollableDistance) * 100;

    calculatedProgress = Math.max(0, Math.min(100, calculatedProgress));

    setProgress(calculatedProgress);
    setIsVisible(true);
  }, [targetSelector]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      calculateProgress();
      rafRef.current = null;
    });
  }, [calculateProgress]);

  useEffect(() => {
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [calculateProgress, handleScroll]);

  return { progress, isVisible };
}
