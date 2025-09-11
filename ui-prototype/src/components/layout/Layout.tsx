import { ReactNode } from 'react';
import DevHeader from './DevHeader';
import Footer from './Footer';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col w-full">
        <DevHeader />
        <div className="flex flex-1 min-h-0 w-full">
          {/* 모바일에서만 사이드바 표시 */}
          <div className="md:hidden">
            <AppSidebar />
          </div>
          <main className="flex-1 overflow-auto min-w-0">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
