import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';

export interface Props {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: Props) {
  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </main>
  );
}
