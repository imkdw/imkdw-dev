import type { Metadata } from 'next';
import { Layout, SeriesCard } from '@imkdw-dev/ui';
import { getSeriesList, getStats } from '@imkdw-dev/actions';
import { SERIES_PER_PAGE } from '@/consts/series.const';
import { SeriesPagination } from '@/components/series/series-pagination';
import { BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: '시리즈 - @imkdw-dev/blog',
  description: '체계적으로 구성된 학습 시리즈로 깊이 있는 지식을 쌓아보세요',
  keywords: ['시리즈', '튜토리얼', '학습 가이드', '프로그래밍', '개발'],
};

export default async function Series({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [seriesData, stats] = await Promise.all([
    getSeriesList({ limit: SERIES_PER_PAGE, page: currentPage }),
    getStats(),
  ]);

  return (
    <Layout>
      <main>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          {/* 헤더 섹션 */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center mb-3 md:mb-4 gap-2">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              <h1 className="text-2xl md:text-3xl font-bold m-0">시리즈</h1>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
              <div className="bg-card rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-muted-foreground truncate">전체 시리즈</p>
                    <p className="text-lg md:text-2xl font-bold">{stats.series.count}</p>
                  </div>
                  <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
                </div>
              </div>
              <div className="bg-card rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-muted-foreground truncate">총 글 수</p>
                    <p className="text-lg md:text-2xl font-bold">{stats.article.count}</p>
                  </div>
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* 시리즈 목록 */}
          <div className="space-y-6">
            {seriesData.items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {seriesData.items.map(s => (
                    <SeriesCard key={s.slug} series={s} />
                  ))}
                </div>
                <SeriesPagination totalPages={seriesData.totalPage} currentPage={currentPage} />
              </>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">시리즈가 없습니다</h3>
                <p className="text-muted-foreground">새로운 시리즈를 기다려주세요</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
