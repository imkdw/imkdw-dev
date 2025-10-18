import { Layout } from '@imkdw-dev/ui';
import { ArticleForm } from '@/components/article/article-form';
import { getCurrentMember } from '@imkdw-dev/actions';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';

export default async function CreateArticlePage() {
  const currentMember = await getCurrentMember();

  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  return (
    <Layout>
      <ArticleForm mode="create" />
    </Layout>
  );
}
