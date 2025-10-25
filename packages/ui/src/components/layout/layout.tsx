import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';
import { getCurrentMember } from '@imkdw-dev/api-client';

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
  onLogout?: () => Promise<void>;
}

export async function Layout({ children, className = '', enableOverflow = true, onLogout }: Props) {
  const currentUser = await getCurrentMember();

  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header currentMember={currentUser} onLogout={onLogout} />
      <main className={cn('flex-1', enableOverflow && 'overflow-auto')}>{children}</main>
      <Footer />
    </main>
  );
}
