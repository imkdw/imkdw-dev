import { Layout } from '@imkdw-dev/ui';
import { ArticleForm } from '@/components/article/article-form';

export default function CreateArticlePage() {
  return (
    <Layout>
      <ArticleForm mode="create" />
    </Layout>
  );
}
