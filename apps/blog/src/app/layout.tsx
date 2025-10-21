import type { Metadata } from 'next';
import { pretendard } from '@imkdw-dev/fonts';

import '@mdxeditor/editor/style.css';
import '@imkdw-dev/ui/globals.css';
import '@imkdw-dev/ui/milkdown.css';
import 'highlight.js/styles/atom-one-dark.css';

import { Providers } from '../components/providers';
import { MobileSidebar } from '../components/sidebar/mobile-sidebar';
import { createMetadata } from '@/utils/metadata-creator';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_ENV } from '@imkdw-dev/consts';

export const metadata: Metadata = createMetadata({
  title: '@imkdw-dev/blog',
  description: '직접 개발하고 운영하는 IT 기술블로그',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={pretendard.className}>
        <Providers>
          {children}
          <MobileSidebar />
        </Providers>
      </body>
      {process.env.APP_ENV === APP_ENV.PRODUCTION && <GoogleAnalytics gaId="G-DXRR1KZDDN" />}
    </html>
  );
}
