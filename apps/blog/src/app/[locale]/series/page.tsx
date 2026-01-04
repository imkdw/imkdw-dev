import { Button } from '@imkdw-dev/ui';
import { getCurrentMember, getSeriesList, getStats } from '@imkdw-dev/api-client';
import { SERIES_PER_PAGE } from '@/consts/series.const';
import { CommonPagination } from '@/components/common/common-pagination';
import { ListHeader } from '@/components/common/list-header';
import { SeriesListGrid } from '@/components/series/series-list-grid';
import { SeriesListEmpty } from '@/components/series/series-list-empty';
import { Layout } from '@/components/layout';
import { BookOpen, FileText, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('series.list');
  return {
    title: t('title'),
    description: t('title'),
  };
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Series({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentMember = await getCurrentMember();
  const t = await getTranslations('series.list');

  const [seriesData, stats] = await Promise.all([
    getSeriesList({ limit: SERIES_PER_PAGE, page: currentPage }),
    getStats(),
  ]);

  const translations = {
    empty: t('empty'),
    emptyDescription: t('emptyDescription'),
  };

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <ListHeader
          title={t('title')}
          stats={[
            { label: t('totalSeries'), value: stats.series.count, icon: BookOpen },
            { label: t('totalArticles'), value: stats.article.count, icon: FileText },
          ]}
          action={
            currentMember?.role === MEMBER_ROLE.ADMIN && (
              <Link href="/series/create">
                <Button className="flex items-center gap-2 whitespace-nowrap">
                  <Plus className="w-4 h-4" />
                  {t('create')}
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
            <SeriesListEmpty translations={translations} />
          )}
        </div>
      </div>
    </Layout>
  );
}
