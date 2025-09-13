import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SidebarMenuProps {
  children: ReactNode;
  className?: string;
}

export function SidebarMenu({ children, className }: SidebarMenuProps) {
  return <ul className={cn('space-y-1', className)}>{children}</ul>;
}

interface SidebarMenuItemProps {
  children: ReactNode;
  className?: string;
}

export function SidebarMenuItem({ children, className }: SidebarMenuItemProps) {
  return <li className={className}>{children}</li>;
}

interface SidebarMenuButtonProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function SidebarMenuButton({ children, className, asChild }: SidebarMenuButtonProps) {
  if (asChild) {
    return <>{children}</>;
  }

  return <div className={cn('block w-full', className)}>{children}</div>;
}