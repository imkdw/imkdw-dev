import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pretendard } from '@imkdw-dev/fonts';
import { ThemeProvider } from 'next-themes';
import { ToyLayout } from '@/components/toy-layout';
import './globals.css';
import Script from 'next/script';
import { APP_ENV } from '@imkdw-dev/consts';

const baseUrl = process.env.NEXT_PUBLIC_TOY_URL ?? 'https://toys.imkdw.dev';

export const metadata: Metadata = {
  title: {
    default: '@imkdw-dev/toys',
    template: '%s | @imkdw-dev/toys',
  },
  description: '개발에 필요한 유틸리티 도구 모음',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: '@imkdw-dev/toys',
    description: '개발에 필요한 유틸리티 도구 모음',
    url: baseUrl,
    siteName: '@imkdw-dev/toys',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {process.env.APP_ENV !== APP_ENV.PRODUCTION && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${pretendard.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToyLayout>{children}</ToyLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
