import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: Props) {
  return <div className={cn('flex flex-col h-full', className)}>{children}</div>;
}