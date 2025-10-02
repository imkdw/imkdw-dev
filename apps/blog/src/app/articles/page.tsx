import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { ArticlesContent } from './articles-content';
import { getTagList, getArticles } from '@imkdw-dev/actions';
import { ARTICLES_PER_PAGE } from '@/consts/article.const';

export const metadata: Metadata = {
  title: '게시글 - @imkdw-dev/blog',
  description: '개발과 기술에 대한 다양한 주제의 글들을 만나보세요',
  keywords: ['게시글', '개발', '프로그래밍', '기술', '튜토리얼'],
};

export default async function Articles({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [articlesData, tags] = await Promise.all([
    getArticles({ page: currentPage, limit: ARTICLES_PER_PAGE }),
    getTagList(),
  ]);

  return (
    <Layout>
      <main>
        <ArticlesContent articlesData={articlesData} tags={tags} currentPage={currentPage} />
      </main>
    </Layout>
  );
}
