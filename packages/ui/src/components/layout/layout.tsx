import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';

export interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
}

export function Layout({ children, className = '', enableOverflow = true }: Props) {
  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header />
      <main className={cn('flex-1', enableOverflow && 'overflow-auto')}>{children}</main>
      <Footer />
    </main>
  );
}
