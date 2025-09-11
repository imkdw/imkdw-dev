import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export interface Props {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: Props) => {
  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${className}`}>
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
};
