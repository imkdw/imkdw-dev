import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getCurrentMember } from '@imkdw-dev/api-client';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@imkdw-dev/i18n';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'series.metadata' });
  return {
    title: t('createTitle'),
  };
}

export default async function CreateSeriesPage() {
  const currentMember = await getCurrentMember();

  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }

  return (
    <Layout>
      <SeriesForm mode="create" />
    </Layout>
  );
}
