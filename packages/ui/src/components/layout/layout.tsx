import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Layout = ({ 
  children, 
  header, 
  footer,
  className = '' 
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${className}`}>
      {header && <Header>{header}</Header>}
      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      
      {footer && <Footer>{footer}</Footer>}
    </div>
  );
};

export default Layout;