import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { mockSeries } from '../../data/mock-data';
import { SeriesContent } from './series-content';

export const metadata: Metadata = {
  title: '시리즈 - @imkdw-dev/blog',
  description: '체계적으로 구성된 학습 시리즈로 깊이 있는 지식을 쌓아보세요',
  keywords: ['시리즈', '튜토리얼', '학습 가이드', '프로그래밍', '개발'],
};

export default function Series() {
  return (
    <Layout>
      <main>
        <SeriesContent initialSeries={mockSeries} />
      </main>
    </Layout>
  );
}
