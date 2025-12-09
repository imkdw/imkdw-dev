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
const MIN_DISPLAY_TIME_MS = 300;

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
  const startTimeRef = useRef<number>(0);
  const minDisplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const clearMinDisplayTimeout = useCallback(() => {
    if (minDisplayTimeoutRef.current) {
      clearTimeout(minDisplayTimeoutRef.current);
      minDisplayTimeoutRef.current = null;
    }
  }, []);

  const completeProgress = useCallback(() => {
    clearProgressInterval();
    setProgress(100);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, DONE_DELAY_MS);
  }, [clearProgressInterval]);

  const start = useCallback(() => {
    clearProgressInterval();
    clearDoneTimeout();
    clearMinDisplayTimeout();
    startTimeRef.current = Date.now();
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
  }, [clearProgressInterval, clearDoneTimeout, clearMinDisplayTimeout]);

  const done = useCallback(() => {
    clearMinDisplayTimeout();

    if (startTimeRef.current === 0) {
      completeProgress();
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remainingTime = MIN_DISPLAY_TIME_MS - elapsed;

    if (remainingTime > 0) {
      minDisplayTimeoutRef.current = setTimeout(() => {
        completeProgress();
      }, remainingTime);
    } else {
      completeProgress();
    }
  }, [clearMinDisplayTimeout, completeProgress]);

  useEffect(() => {
    return () => {
      clearProgressInterval();
      clearDoneTimeout();
      clearMinDisplayTimeout();
    };
  }, [clearProgressInterval, clearDoneTimeout, clearMinDisplayTimeout]);

  return {
    isLoading,
    progress,
    start,
    done,
  };
}
