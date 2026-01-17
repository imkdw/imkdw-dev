import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getSeriesDetail, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@imkdw-dev/i18n';

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'series.metadata' });
  return {
    title: t('editTitle'),
  };
}

export default async function EditSeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesDetail(slug);
  const currentMember = await getCurrentMember();

  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  return (
    <Layout>
      <SeriesForm mode="edit" initialData={series} />
    </Layout>
  );
}
