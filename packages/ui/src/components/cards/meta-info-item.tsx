import type { ReactNode } from 'react';
import { cn } from '../../lib';

interface Props {
  icon: ReactNode;
  text: string;
  className?: string;
}

export function MetaInfoItem({ icon, text, className }: Props) {
  return (
    <div className={cn('flex items-center space-x-1 text-sm', className)}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
