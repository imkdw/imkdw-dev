'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './button';
import { cn } from '../lib/utils';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        {...props}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    );
  }
);
SidebarTrigger.displayName = 'SidebarTrigger';

export { SidebarTrigger };