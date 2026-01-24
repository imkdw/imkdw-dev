'use client';

import { cn } from '../lib/utils';

interface MacOSControlsProps {
  className?: string;
}

export function MacOSControls({ className }: MacOSControlsProps) {
  return (
    <div className={cn('flex gap-1.5', className)}>
      <div className="control-dot control-dot-close" role="button" tabIndex={0} aria-label="Close" />
      <div className="control-dot control-dot-minimize" role="button" tabIndex={0} aria-label="Minimize" />
      <div className="control-dot control-dot-maximize" role="button" tabIndex={0} aria-label="Maximize" />
    </div>
  );
}
