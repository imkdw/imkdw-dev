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

  const formHeaderTranslations = {
    createTitle: t('articles.form.createTitle'),
    editTitle: t('articles.form.editTitle'),
    publish: t('articles.form.publish'),
  };

  const visibilityTranslations = {
    title: t('articles.visibility.title'),
    public: t('articles.visibility.public'),
    publicDescription: t('articles.visibility.publicDescription'),
    private: t('articles.visibility.private'),
    privateDescription: t('articles.visibility.privateDescription'),
    label: t('articles.visibility.label'),
  };

  const statsTranslations = {
    characters: t('articles.stats.characters'),
    words: t('articles.stats.words'),
    readingTime: t('articles.stats.readingTime'),
    minutes: t('articles.stats.minutes'),
  };

  return (
    <Layout>
      <ArticleForm
        mode="create"
        draftDialogTranslations={draftDialogTranslations}
        formHeaderTranslations={formHeaderTranslations}
        visibilityTranslations={visibilityTranslations}
        statsTranslations={statsTranslations}
      />
    </Layout>
  );
}
