'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './auth.store';
import { getCurrentMember } from '@imkdw-dev/api-client';

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const setMember = useAuthStore(state => state.setMember);

  useEffect(() => {
    const syncMember = async () => {
      try {
        const member = await getCurrentMember();
        setMember(member);
      } catch {
        setMember(null);
      }
    };

    syncMember();
  }, [setMember]);

  return <>{children}</>;
}
