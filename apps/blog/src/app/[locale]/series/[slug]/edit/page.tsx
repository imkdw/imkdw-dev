import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getSeriesDetail, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations('series.form');
  return {
    title: t('editTitle'),
  };
}

export default async function EditSeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesDetail(slug);
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
      <SeriesForm mode="edit" initialData={series} translations={translations} />
    </Layout>
  );
}
