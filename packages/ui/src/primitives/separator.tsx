import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export function Separator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shrink-0 bg-border h-[1px] w-full', className)} {...props} />;
}