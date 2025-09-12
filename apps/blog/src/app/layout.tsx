import type { Metadata } from 'next';
import { pretendard } from '@imkdw-dev/fonts';

import './globals.css';
import { Providers } from '../components/providers';

export const metadata: Metadata = {
  title: '@imkdw-dev/blog',
  description: 'Personal blog by @imkdw-dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
