import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { ArticleForm } from '@/components/article/article-form';
import { getArticle, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [t, { article }] = await Promise.all([getTranslations('articles.form'), getArticle(slug)]);

  return {
    title: `${t('editTitle')} - ${article.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params;
  const { article } = await getArticle(slug);
  const currentMember = await getCurrentMember();

  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  return (
    <Layout>
      <ArticleForm mode="edit" initialData={article} />
    </Layout>
  );
}
