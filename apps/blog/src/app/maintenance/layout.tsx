import type { ReactNode } from 'react';
import Script from 'next/script';

export default function MaintenanceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script id="maintenance-dark-mode" strategy="beforeInteractive">
        {`document.documentElement.classList.add('dark');`}
      </Script>
      {children}
    </>
  );
}
