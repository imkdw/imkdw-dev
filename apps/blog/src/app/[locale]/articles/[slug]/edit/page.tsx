import { Layout } from '@/components/layout';
import { ArticleForm } from '@/components/article/article-form';
import { getArticle, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { getTranslations } from 'next-intl/server';

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
        mode="edit"
        initialData={article}
        draftDialogTranslations={draftDialogTranslations}
        formHeaderTranslations={formHeaderTranslations}
        visibilityTranslations={visibilityTranslations}
        statsTranslations={statsTranslations}
      />
    </Layout>
  );
}
