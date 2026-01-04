import { Layout } from '@/components/layout';
import { ArticleForm } from '@/components/article/article-form';
import { getCurrentMember } from '@imkdw-dev/api-client';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export default async function CreateArticlePage() {
  const currentMember = await getCurrentMember();
  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  const t = await getTranslations();

  const draftDialogTranslations = {
    title: t('common.dialog.draftTitle'),
    description: t('common.dialog.draftDescription'),
    subDescription: t('common.dialog.draftSubDescription'),
    restore: t('common.dialog.draftRestore'),
    discard: t('common.dialog.draftDiscard'),
  };

  return (
    <Layout>
      <ArticleForm mode="create" draftDialogTranslations={draftDialogTranslations} />
    </Layout>
  );
}
