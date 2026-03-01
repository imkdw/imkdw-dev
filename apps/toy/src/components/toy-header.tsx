'use client';

import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { SidebarTrigger, MacOSControls, ThemeToggle, cn } from '@imkdw-dev/ui';

export function ToyHeader() {
  return (
    <header className="shrink-0 border-b border-border bg-background">
      <div className="flex bg-muted px-4 py-3 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="md:hidden shrink-0">
            <SidebarTrigger />
          </div>
          <MacOSControls />
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-primary" />
            <Link href="/" className={cn('text-md text-primary', jetBrainsMono.className)}>
              @imkdw-dev/toy
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="text-primary" />
        </div>
      </div>
    </header>
  );
}
