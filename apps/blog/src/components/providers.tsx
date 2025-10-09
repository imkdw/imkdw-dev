import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@imkdw-dev/ui';
import { Toaster } from '@imkdw-dev/toast';
import { AuthProvider } from '@imkdw-dev/auth';

interface ProvidersProps {
  children: React.ReactNode;
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
