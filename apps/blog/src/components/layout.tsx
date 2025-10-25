import { ReactNode } from 'react';
import { Layout as UILayout } from '@imkdw-dev/ui';
import { logout } from '@/actions/logout';

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
}

export async function Layout({ children, className, enableOverflow }: Props) {
  return (
    <UILayout className={className} enableOverflow={enableOverflow} onLogout={logout}>
      {children}
    </UILayout>
  );
}
