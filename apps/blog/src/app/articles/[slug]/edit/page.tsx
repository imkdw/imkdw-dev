import { Layout } from '@imkdw-dev/ui';
import { ArticleForm } from '@/components/article/article-form';
import { getArticle } from '@imkdw-dev/actions';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleEditPage({ params }: Props) {
  const { slug } = await params;
  const { article } = await getArticle(slug);

  return (
    <Layout>
      <ArticleForm mode="edit" initialData={article} />
    </Layout>
  );
}
