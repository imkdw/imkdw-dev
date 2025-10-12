import { Layout } from '@imkdw-dev/ui';
import { ArticlesContent } from '../../components/article/articles-content';
import { getTagList, getArticles } from '@imkdw-dev/actions';
import { ARTICLES_PER_PAGE } from '@/consts/article.const';
import { createMetadata } from '@/utils/metadata-creator';

export const metadata = createMetadata({
  title: '게시글 목록',
  description: '게시글 목록을 보여주는 페이지입니다',
});

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Articles({ searchParams }: Props) {
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
