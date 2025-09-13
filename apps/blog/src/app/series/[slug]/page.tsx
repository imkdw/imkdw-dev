import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { SeriesBackButton } from '../../../components/series/series-back-button';
import { SeriesHeader } from '../../../components/series/series-header';
import { ArticleListWithPagination } from '../../../components/series/article-list-with-pagination';
import { getMockSeriesData } from '../../../data/mock-series-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = await params;

  return {
    title: 'React 완전정복 - 시리즈',
    description:
      'React의 기초부터 고급 기능까지 단계별로 학습할 수 있는 완전한 가이드입니다. Hook, Context, 성능 최적화 등 실무에서 필요한 모든 내용을 다룹니다.',
    keywords: ['React', 'JavaScript', 'Frontend', '시리즈', '튜토리얼'],
    authors: [{ name: 'imkdw' }],
    openGraph: {
      title: 'React 완전정복 - 시리즈',
      description: 'React의 기초부터 고급 기능까지 단계별로 학습할 수 있는 완전한 가이드입니다.',
      type: 'website',
      siteName: 'imkdw Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'React 완전정복 - 시리즈',
      description: 'React의 기초부터 고급 기능까지 단계별로 학습할 수 있는 완전한 가이드입니다.',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const seriesData = getMockSeriesData(slug);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        <SeriesBackButton />
        <SeriesHeader seriesData={seriesData} />
        <ArticleListWithPagination articles={seriesData.articles} />
      </div>
    </Layout>
  );
}
