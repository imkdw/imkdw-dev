'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface NavigationProgressState {
  isLoading: boolean;
  progress: number;
}

interface NavigationProgressActions {
  start: () => void;
  done: () => void;
}

const TRICKLE_INTERVAL_MS = 50;
const DONE_DELAY_MS = 300;

function getIncrement(current: number): number {
  if (current < 20) return 3;
  if (current < 40) return 2;
  if (current < 60) return 1;
  if (current < 80) return 0.5;
  if (current < 90) return 0.2;
  return 0;
}

export function useNavigationProgress(): NavigationProgressState & NavigationProgressActions {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const clearDoneTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearProgressInterval();
    clearDoneTimeout();
    setIsLoading(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const increment = getIncrement(prev);
        if (increment === 0) {
          clearProgressInterval();
          return prev;
        }
        return Math.min(prev + increment, 90);
      });
    }, TRICKLE_INTERVAL_MS);
  }, [clearProgressInterval, clearDoneTimeout]);

  const done = useCallback(() => {
    clearProgressInterval();
    setProgress(100);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, DONE_DELAY_MS);
  }, [clearProgressInterval]);

  useEffect(() => {
    return () => {
      clearProgressInterval();
      clearDoneTimeout();
    };
  }, [clearProgressInterval, clearDoneTimeout]);

  return {
    isLoading,
    progress,
    start,
    done,
  };
}
