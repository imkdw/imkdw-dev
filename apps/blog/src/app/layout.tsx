import type { Metadata } from 'next';
import { pretendard } from '@imkdw-dev/fonts';

import '@mdxeditor/editor/style.css';
import '@imkdw-dev/ui/globals.css';
import '@imkdw-dev/ui/milkdown.css';

import { Providers } from '../components/providers';
import { MobileSidebar } from '../components/sidebar/mobile-sidebar';

export const metadata: Metadata = {
  title: '@imkdw-dev/blog',
  description: 'Personal blog by @imkdw-dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={pretendard.className}>
        <Providers>
          {children}
          <MobileSidebar />
        </Providers>
      </body>
    </html>
  );
}
