import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { requireAdmin } from '@/lib/require-admin';
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
    robots: { index: false, follow: false },
  };
}

export default async function CreateSeriesPage() {
  await requireAdmin();

  return (
    <Layout>
      <SeriesForm mode="create" />
    </Layout>
  );
}
