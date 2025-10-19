'use client';

import { ReactNode, useEffect } from 'react';
import { useAuthStore } from './auth.store';

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const initializeAuth = useAuthStore(state => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
