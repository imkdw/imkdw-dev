'use client';

import { cn } from '@imkdw-dev/ui';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface Props {
  targetSelector?: string;
  className?: string;
}

export function ReadingProgressBar({ targetSelector = '.milkdown', className }: Props) {
  const { progress, isVisible } = useReadingProgress(targetSelector);

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden={!isVisible}
      className={cn(
        'fixed left-0 top-0 z-50 h-[6px] w-full',
        'pointer-events-none',
        'transition-opacity duration-200 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      <div
        className={cn(
          'h-full bg-primary',
          'shadow-[0_0_10px_hsl(142_76%_36%/0.5)]',
          'transition-[width] duration-100 ease-out'
        )}
        style={{
          width: `${clampedProgress}%`,
        }}
      />
    </div>
  );
}
