import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@imkdw-dev/ui';
import { Toaster } from '@imkdw-dev/toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        {children}
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}
