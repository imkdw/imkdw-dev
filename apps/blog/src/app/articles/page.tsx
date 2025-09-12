import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { recentArticles } from '../../data/mock-data';
import { ArticlesContent } from './articles-content';

export const metadata: Metadata = {
  title: '게시글 - @imkdw-dev/blog',
  description: '개발과 기술에 대한 다양한 주제의 글들을 만나보세요',
  keywords: ['게시글', '개발', '프로그래밍', '기술', '튜토리얼'],
};

export default function Articles() {
  return (
    <Layout>
      <main>
        <ArticlesContent initialArticles={recentArticles} />
      </main>
    </Layout>
  );
}
