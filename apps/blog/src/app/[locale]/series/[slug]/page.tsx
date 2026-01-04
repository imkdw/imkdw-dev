import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { SeriesBackButton } from '@/components/series/series-back-button';
import { SeriesHeader } from '@/components/series/series-header';
import { SeriesArticles } from '@/components/series/series-articles';
import { getSeriesDetail, getArticles } from '@imkdw-dev/api-client';
import { SERIES_ARTICLES_PER_PAGE } from '@/consts/article.const';
import { createMetadata } from '@/utils/metadata-creator';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seriesData = await getSeriesDetail(slug);

  return createMetadata({
    title: `${seriesData.title}`,
    description: seriesData.description,
  });
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const t = await getTranslations();

  const seriesData = await getSeriesDetail(slug);
  const articlesData = await getArticles({
    seriesId: seriesData.id,
    limit: SERIES_ARTICLES_PER_PAGE,
    page: currentPage,
  });

  const seriesHeaderTranslations = {
    seriesLabel: t('series.label'),
    seriesActions: {
      deleteDialog: {
        title: t('series.deleteDialog.title'),
        description: t('series.deleteDialog.description'),
        cancel: t('common.buttons.cancel'),
        delete: t('common.buttons.delete'),
        deleting: t('common.status.deleting'),
      },
      toast: {
        copySuccess: t('series.toast.copySuccess'),
        copyError: t('series.toast.copyError'),
        deleteSuccess: t('series.toast.deleteSuccess'),
        deleteError: t('series.toast.deleteError'),
      },
      buttons: {
        share: t('series.buttons.share'),
        edit: t('series.buttons.edit'),
        delete: t('common.buttons.delete'),
      },
    },
    stats: {
      totalArticles: t('series.stats.totalArticles'),
      totalReadTime: t('series.stats.totalReadTime'),
      lastUpdated: t('series.stats.lastUpdated'),
      createdAt: t('series.stats.createdAt'),
      hours: t('series.stats.hours'),
      minutes: t('series.stats.minutes'),
    },
  };

  const seriesArticlesTranslations = {
    articleList: t('series.detail.articleList'),
    articleListDescription: t('series.detail.articleListDescription'),
    read: t('series.detail.read'),
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <SeriesBackButton />
        <SeriesHeader seriesData={seriesData} translations={seriesHeaderTranslations} />
        <SeriesArticles
          articles={articlesData.items}
          totalPages={articlesData.totalPage}
          currentPage={currentPage}
          slug={slug}
          totalCount={articlesData.totalCount}
          translations={seriesArticlesTranslations}
        />
      </div>
    </Layout>
  );
}
