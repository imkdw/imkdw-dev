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
          border: '1px solid hsl(var(--border))',
        },
      }}
      className="toaster group"
      expand={false}
      richColors
      closeButton
    />
  );
}
