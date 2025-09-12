'use client';

import { cn } from '../lib/utils';

interface MacOSControlsProps {
  className?: string;
}

export function MacOSControls({ className }: MacOSControlsProps) {
  return (
    <div className={cn('window-controls', className)}>
      <div className="control-dot close" role="button" tabIndex={0} aria-label="Close" />
      <div className="control-dot minimize" role="button" tabIndex={0} aria-label="Minimize" />
      <div className="control-dot maximize" role="button" tabIndex={0} aria-label="Maximize" />
    </div>
  );
}
