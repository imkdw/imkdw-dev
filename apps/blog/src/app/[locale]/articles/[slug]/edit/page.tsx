import { Layout } from '@/components/layout';
import { ArticleForm } from '@/components/article/article-form';
import { getArticle, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

interface Props {
  params: Promise<{ slug: string }>;
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
