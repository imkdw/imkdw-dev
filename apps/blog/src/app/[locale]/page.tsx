import type { Metadata } from 'next';
import { TerminalSection } from '@imkdw-dev/ui';
import { Layout } from '@/components/layout';
import { RecentSeries } from '@/components/sections/recent-series-section';
import { RecentArticles } from '@/components/sections/recent-articles-section';
import { getSeriesList, getArticles, getStats } from '@imkdw-dev/api-client';
import { RECENT_SERIES_CARD_COUNT } from '@/consts/series.const';
import { RECENT_ARTICLES_COUNT } from '@/consts/article.const';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@imkdw-dev/i18n';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
  };
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const [series, articles, statsData] = await Promise.all([
    getSeriesList({ limit: RECENT_SERIES_CARD_COUNT, page: 1 }),
    getArticles({ limit: RECENT_ARTICLES_COUNT, page: 1 }),
    getStats(),
  ]);

  const t = await getTranslations('home');
  const tUi = await getTranslations('ui');

  const statsTranslations = {
    totalArticles: t('stats.totalArticles'),
    activeSeries: t('stats.activeSeries'),
    totalViews: t('stats.totalViews'),
    techTags: t('stats.techTags'),
  };

  const recentArticlesTranslations = {
    title: t('recentArticles.title'),
    viewAll: t('recentArticles.viewAll'),
    viewAllShort: t('recentArticles.viewAllShort'),
  };

  const recentSeriesTranslations = {
    title: t('recentSeries.title'),
    viewAll: t('recentSeries.viewAll'),
    viewAllShort: t('recentSeries.viewAllShort'),
  };

  const seriesCardTranslations = {
    articleCount: tUi('articleCountTemplate'),
    lastUpdated: tUi('lastUpdated'),
  };

  return (
    <Layout>
      <div>
        <TerminalSection
          title={t('terminal.title')}
          description={t('terminal.description')}
          stats={statsData}
          tags={['Node.js', 'TypeScript', 'Nest.js', 'Prisma', 'Next.js']}
          statsTranslations={statsTranslations}
        />
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          <RecentSeries
            seriesList={series.items}
            translations={recentSeriesTranslations}
            seriesCardTranslations={seriesCardTranslations}
            locale={locale}
          />
          <RecentArticles articles={articles.items} translations={recentArticlesTranslations} locale={locale} />
        </div>
      </div>
    </Layout>
  );
}
