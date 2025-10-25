import { Layout, Button } from '@imkdw-dev/ui';
import { getCurrentMember, getSeriesList, getStats } from '@imkdw-dev/api-client';
import { SERIES_PER_PAGE } from '@/consts/series.const';
import { CommonPagination } from '@/components/common/common-pagination';
import { ListHeader } from '@/components/common/list-header';
import { SeriesListGrid } from '@/components/series/series-list-grid';
import { SeriesListEmpty } from '@/components/series/series-list-empty';
import { createMetadata } from '@/utils/metadata-creator';
import { BookOpen, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

export const metadata = createMetadata({
  title: '시리즈 목록',
  description: '블로그에 작성된 시리즈 목록 페이지입니다',
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Series({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentMember = await getCurrentMember();

  const [seriesData, stats] = await Promise.all([
    getSeriesList({ limit: SERIES_PER_PAGE, page: currentPage }),
    getStats(),
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <ListHeader
          title="시리즈 목록"
          stats={[
            { label: '전체 시리즈', value: stats.series.count, icon: BookOpen },
            { label: '총 글 수', value: stats.article.count, icon: FileText },
          ]}
          action={
            currentMember?.role === MEMBER_ROLE.ADMIN && (
              <Link href="/series/create">
                <Button className="flex items-center gap-2 whitespace-nowrap">
                  <Plus className="w-4 h-4" />
                  시리즈 만들기
                </Button>
              </Link>
            )
          }
        />

        <div className="flex flex-col gap-4">
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
