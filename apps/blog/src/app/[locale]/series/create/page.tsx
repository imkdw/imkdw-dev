import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getCurrentMember } from '@imkdw-dev/api-client';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('series.form');
  return {
    title: t('createTitle'),
  };
}

export default async function CreateSeriesPage() {
  const currentMember = await getCurrentMember();
  const t = await getTranslations('series.form');

  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  const translations = {
    createTitle: t('createTitle'),
    editTitle: t('editTitle'),
    saveDraft: t('saveDraft'),
    publish: t('publish'),
  };

  return (
    <Layout>
      <SeriesForm mode="create" translations={translations} />
    </Layout>
  );
}
