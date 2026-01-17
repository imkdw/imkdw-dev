import { pretendard, jetBrainsMono } from '@imkdw-dev/fonts';

import '@imkdw-dev/ui/globals.css';
import '@imkdw-dev/ui/milkdown.css';
import '@imkdw-dev/ui/image-zoom.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      style={{ '--font-code': jetBrainsMono.style.fontFamily } as React.CSSProperties}
    >
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
