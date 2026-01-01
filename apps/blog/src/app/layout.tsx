import type { Metadata } from 'next';
import { pretendard, jetBrainsMono } from '@imkdw-dev/fonts';

import '@imkdw-dev/ui/globals.css';
import '@imkdw-dev/ui/milkdown.css';
import '@imkdw-dev/ui/image-zoom.css';

import { Providers } from '../components/providers';
import { MobileSidebar } from '../components/sidebar/mobile-sidebar';
import { NavigationProgress } from '../components/navigation-progress';
import { createMetadata } from '@/utils/metadata-creator';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_ENV } from '@imkdw-dev/consts';

export const metadata: Metadata = {
  ...createMetadata({
    title: '@imkdw-dev/blog',
    description: '직접 개발하고 운영하는 IT 기술블로그',
  }),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      style={{ '--font-code': jetBrainsMono.style.fontFamily } as React.CSSProperties}
    >
      <body className={pretendard.className}>
        <Providers>
          <NavigationProgress />
          {children}
          <MobileSidebar />
        </Providers>
      </body>
      {process.env.APP_ENV === APP_ENV.PRODUCTION && <GoogleAnalytics gaId="G-DXRR1KZDDN" />}
    </html>
  );
}
