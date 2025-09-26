import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';
import { getCurrentMember } from '@imkdw-dev/actions';

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
}

export async function Layout({ children, className = '', enableOverflow = true }: Props) {
  const currentUser = await getCurrentMember();

  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header currentMember={currentUser} />
      <main className={cn('flex-1', enableOverflow && 'overflow-auto')}>{children}</main>
      <Footer />
    </main>
  );
}
