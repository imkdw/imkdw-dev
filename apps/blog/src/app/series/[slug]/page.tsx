import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { SeriesBackButton } from '../../../components/series/series-back-button';
import { SeriesHeader } from '../../../components/series/series-header';
import { ArticleListWithPagination } from '../../../components/series/article-list-with-pagination';
import { getSeriesDetail, getArticles } from '@imkdw-dev/actions';
import { SERIES_ARTICLES_PER_PAGE } from '@/consts/article.const';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seriesData = await getSeriesDetail(slug);

  return {
    title: `${seriesData.title} - 시리즈`,
    description: seriesData.description,
    keywords: seriesData.tags.map((tag: { id: string; name: string }) => tag.name),
    authors: [{ name: 'imkdw' }],
    openGraph: {
      title: `${seriesData.title} - 시리즈`,
      description: seriesData.description,
      type: 'website',
      siteName: 'imkdw Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seriesData.title} - 시리즈`,
      description: seriesData.description,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const seriesData = await getSeriesDetail(slug);
  const articlesData = await getArticles({
    seriesId: seriesData.id,
    limit: SERIES_ARTICLES_PER_PAGE,
    page: currentPage,
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <SeriesBackButton />
        <SeriesHeader seriesData={seriesData} />
        <ArticleListWithPagination
          articles={articlesData.items}
          totalPages={articlesData.totalPage}
          currentPage={currentPage}
          slug={slug}
          totalCount={articlesData.totalCount}
        />
      </div>
    </Layout>
  );
}
