import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { ArticlesContent } from '@/components/article/articles-content';
import { getTagList, getArticles } from '@imkdw-dev/api-client';
import { ARTICLES_PER_PAGE } from '@/consts/article.const';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('articles.list');
  return {
    title: t('title'),
    description: t('title'),
  };
}

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

  const t = await getTranslations('articles.list');

  const translations = {
    title: t('title'),
    totalArticles: t('totalArticles'),
    tags: t('tags'),
    searchPlaceholder: t('searchPlaceholder'),
    noResults: t('noResults'),
    filterAll: t('filterAll'),
  };

  return (
    <Layout>
      <ArticlesContent articlesData={articlesData} tags={tags} currentPage={currentPage} translations={translations} />
    </Layout>
  );
}
