'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './button';
import { cn } from '../lib/utils';

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  return (
    <Button variant="ghost" size="icon" className={cn('h-8 w-8', className)} {...props}>
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}
