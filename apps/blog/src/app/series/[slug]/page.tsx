import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { SeriesBackButton } from '../../../components/series/series-back-button';
import { SeriesHeader } from '../../../components/series/series-header';
import { SeriesArticles } from '../../../components/series/series-articles';
import { getSeriesDetail, getArticles } from '@imkdw-dev/actions';
import { SERIES_ARTICLES_PER_PAGE } from '@/consts/article.const';
import { createMetadata } from '@/utils/metadata-creator';

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
        <SeriesArticles
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
