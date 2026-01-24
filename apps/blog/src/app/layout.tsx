import type { ReactNode, CSSProperties } from 'react';
import { pretendard, jetBrainsMono } from '@imkdw-dev/fonts';

import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      style={{ '--font-code': jetBrainsMono.style.fontFamily } as CSSProperties}
    >
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
