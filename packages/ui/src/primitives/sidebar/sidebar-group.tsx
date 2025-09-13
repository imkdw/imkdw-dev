import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SidebarGroupProps {
  children: ReactNode;
  className?: string;
}

export function SidebarGroup({ children, className }: SidebarGroupProps) {
  return <div className={cn('py-2', className)}>{children}</div>;
}

interface SidebarGroupLabelProps {
  children: ReactNode;
  className?: string;
}

export function SidebarGroupLabel({ children, className }: SidebarGroupLabelProps) {
  return (
    <div className={cn('px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider', className)}>
      {children}
    </div>
  );
}

interface SidebarGroupContentProps {
  children: ReactNode;
  className?: string;
}

export function SidebarGroupContent({ children, className }: SidebarGroupContentProps) {
  return <div className={cn('space-y-1', className)}>{children}</div>;
}