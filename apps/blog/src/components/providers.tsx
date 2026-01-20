'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@imkdw-dev/ui/contexts';
import { Toaster } from '@imkdw-dev/toast';
import { AuthProvider } from '@imkdw-dev/auth';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
