'use client';

import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@imkdw-dev/ui';
import { DesktopSidebar } from './desktop-sidebar';
import { ToySidebarContent } from './toy-sidebar-content';
import { ToyHeader } from './toy-header';

interface Props {
  children: ReactNode;
}

export function ToyLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar>
        <ToySidebarContent />
      </Sidebar>

      <div className="flex flex-col h-screen w-full">
        <ToyHeader />

        <ResizablePanelGroup orientation="horizontal" className="flex-1">
          <ResizablePanel defaultSize="280px" minSize="280px" maxSize="400px" className="md:block">
            <DesktopSidebar>
              <ToySidebarContent />
            </DesktopSidebar>
          </ResizablePanel>

          <ResizableHandle className="hidden md:flex" />

          <ResizablePanel>
            <main className="h-full overflow-y-auto">
              <div className="px-8 py-8">{children}</div>
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarProvider>
  );
}
