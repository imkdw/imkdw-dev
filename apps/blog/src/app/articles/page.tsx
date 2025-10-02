import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { ArticlesContent } from './articles-content';
import { getTagList } from '@imkdw-dev/actions';

export const metadata: Metadata = {
  title: '게시글 - @imkdw-dev/blog',
  description: '개발과 기술에 대한 다양한 주제의 글들을 만나보세요',
  keywords: ['게시글', '개발', '프로그래밍', '기술', '튜토리얼'],
};

export default async function Articles() {
  // TODO: ArticlesContent 컴포넌트의 Props 타입을 API 응답에 맞게 수정 필요
  const initialArticles: Array<{
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    series: string;
    slug: string;
  }> = [];

  const tags = await getTagList();

  return (
    <Layout>
      <main>
        <ArticlesContent initialArticles={initialArticles} initialTags={tags} />
      </main>
    </Layout>
  );
}
