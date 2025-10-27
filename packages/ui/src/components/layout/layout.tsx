import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
  onLogout?: () => Promise<void>;
}

export function Layout({ children, className = '', enableOverflow = true, onLogout }: Props) {
  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header onLogout={onLogout} />
      <main className={cn('flex-1', enableOverflow && 'overflow-auto')}>{children}</main>
      <Footer />
    </main>
  );
}
