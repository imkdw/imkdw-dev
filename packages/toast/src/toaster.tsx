'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SonnerComponent = Sonner as any;

  return (
    <SonnerComponent
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: 'sonner-toast',
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '2px solid hsl(var(--border))',
          fontSize: '16px',
          padding: '16px 20px',
          minWidth: '320px',
          maxWidth: '420px',
          lineHeight: '1.5',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
      className="toaster group"
      expand
      visibleToasts={4}
      gap={12}
      offset={24}
      richColors
      closeButton
    />
  );
}
