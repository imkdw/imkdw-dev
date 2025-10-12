import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { getSeriesList, getStats } from '@imkdw-dev/actions';
import { SERIES_PER_PAGE } from '@/consts/series.const';
import { CommonPagination } from '@/components/common/common-pagination';
import { SeriesListHeader } from '@/components/series/series-list-header';
import { SeriesListStats } from '@/components/series/series-list-stats';
import { SeriesListGrid } from '@/components/series/series-list-grid';
import { SeriesListEmpty } from '@/components/series/series-list-empty';

export const metadata: Metadata = {
  title: 'IMKDW-Dev - 시리즈 목록',
  description: '블로그에 작성된 시리즈 목록 페이지입니다',
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Series({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [seriesData, stats] = await Promise.all([
    getSeriesList({ limit: SERIES_PER_PAGE, page: currentPage }),
    getStats(),
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <div className="pb-6 md:pb-8">
          <SeriesListHeader />
          <SeriesListStats totalSeriesCount={stats.series.count} totalArticleCount={stats.article.count} />
        </div>

        <div className="flex flex-col gap-6">
          {seriesData.items.length > 0 ? (
            <>
              <SeriesListGrid items={seriesData.items} />
              <CommonPagination
                totalPages={seriesData.totalPage}
                currentPage={currentPage}
                createPageUrl={page => `/series?page=${page}`}
              />
            </>
          ) : (
            <SeriesListEmpty />
          )}
        </div>
      </div>
    </Layout>
  );
}
