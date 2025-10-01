import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { SeriesContent } from './series-content';
import { getSeriesList } from '@imkdw-dev/actions';

export const metadata: Metadata = {
  title: '시리즈 - @imkdw-dev/blog',
  description: '체계적으로 구성된 학습 시리즈로 깊이 있는 지식을 쌓아보세요',
  keywords: ['시리즈', '튜토리얼', '학습 가이드', '프로그래밍', '개발'],
};

export default async function Series() {
  const seriesData = await getSeriesList({
    limit: 100,
    page: 1,
  });

  return (
    <Layout>
      <main>
        <SeriesContent initialSeries={seriesData.items} />
      </main>
    </Layout>
  );
}
