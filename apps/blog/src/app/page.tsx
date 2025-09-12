import type { Metadata } from 'next';
import { Layout, TerminalSection } from '@imkdw-dev/ui';
import { RecentSeriesSection, RecentArticlesSection, BlogStatsSection } from '../components';
import { recentArticles, recentSeries, blogStats, terminalCommands } from '../data/mock-data';

export const metadata: Metadata = {
  title: '@imkdw-dev/blog',
  description: '직접 개발하고 운영하는 기술블로그',
  keywords: ['Node.js', 'TypeScript', 'Nest.js', 'Prisma', 'Next.js'],
  authors: [{ name: 'imkdw', url: 'https://github.com/imkdw' }],
  creator: 'imkdw',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'imkdw 개발 블로그',
    description: '최신 웹 기술과 프로그래밍 지식을 공유하는 개발자 블로그',
    siteName: 'imkdw Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'imkdw 개발 블로그',
    description: '최신 웹 기술과 프로그래밍 지식을 공유하는 개발자 블로그',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
};

export default function Home() {
  return (
    <Layout>
      <div>
        <TerminalSection
          commands={terminalCommands}
          title="Tech Blog"
          description="학습하고 경험한 내용들을 공유하는 기술블로그 입니다"
          stats={blogStats}
          tags={['Node.js', 'TypeScript', 'Nest.js', 'Prisma', 'Next.js']}
        />

        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          <RecentSeriesSection series={recentSeries} />
          <RecentArticlesSection articles={recentArticles} />
          <BlogStatsSection />
        </div>
      </div>
    </Layout>
  );
}
