import type { Metadata } from 'next';
import { TerminalSection } from '@imkdw-dev/ui';
import { Layout } from '@/components/layout';
import { RecentSeries } from '../components/sections/recent-series-section';
import { RecentArticles } from '../components/sections/recent-articles-section';
import { getSeriesList, getArticles, getStats } from '@imkdw-dev/api-client';
import { RECENT_SERIES_CARD_COUNT } from '@/consts/series.const';
import { RECENT_ARTICLES_COUNT } from '@/consts/article.const';
import { createMetadata } from '@/utils/metadata-creator';

export const metadata: Metadata = createMetadata({
  title: '@imkdw-dev/blog',
  description: '직접 개발하고 운영하는 IT 기술블로그',
});

export default async function Home() {
  const series = await getSeriesList({ limit: RECENT_SERIES_CARD_COUNT, page: 1 });
  const articles = await getArticles({ limit: RECENT_ARTICLES_COUNT, page: 1 });
  const statsData = await getStats();

  return (
    <Layout>
      <div>
        <TerminalSection
          title="Tech Blog"
          description="학습하고 경험한 내용들을 공유하는 기술블로그 입니다"
          stats={statsData}
          tags={['Node.js', 'TypeScript', 'Nest.js', 'Prisma', 'Next.js']}
        />
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          <RecentSeries seriesList={series.items} />
          <RecentArticles articles={articles.items} />
        </div>
      </div>
    </Layout>
  );
}
