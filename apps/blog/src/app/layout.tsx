import type { ReactNode, CSSProperties } from 'react';
import { pretendard, jetBrainsMono } from '@imkdw-dev/fonts';

import './globals.css';
import Script from 'next/script';
import { APP_ENV } from '@imkdw-dev/consts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning style={{ '--font-code': jetBrainsMono.style.fontFamily } as CSSProperties}>
      <head>
        {process.env.APP_ENV !== APP_ENV.PRODUCTION && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
