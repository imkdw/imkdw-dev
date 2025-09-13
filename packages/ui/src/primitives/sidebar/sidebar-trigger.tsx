'use client';

import { Menu } from 'lucide-react';
import { Button } from '../button';
import { cn } from '../../lib/utils';
import { useSidebar } from '../../contexts/sidebar-context';

interface Props {
  className?: string;
}

export function SidebarTrigger({ className }: Props) {
  const { toggle } = useSidebar();

  return (
    <Button variant="ghost" size="icon" className={cn('h-8 w-8', className)} onClick={toggle}>
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}