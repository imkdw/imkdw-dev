'use client';

import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isVisible: boolean;
  className?: string;
}

export function ProgressBar({ progress, isVisible, className }: Props) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const isComplete = clampedProgress === 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden={!isVisible}
      className={cn('fixed left-0 top-0 z-50 h-[7px] w-full', 'pointer-events-none', className)}
    >
      <div
        className={cn(
          'h-full bg-primary',
          'transition-[width] duration-200 ease-out',
          'transition-opacity',
          isVisible && !isComplete && 'opacity-100',
          isComplete && 'opacity-0 duration-300',
          !isVisible && 'opacity-0'
        )}
        style={{
          width: `${clampedProgress}%`,
        }}
      />
    </div>
  );
}
