import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getSeriesDetail } from '@imkdw-dev/api-client';
import { requireAdmin } from '@/lib/require-admin';
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
    robots: { index: false, follow: false },
  };
}

export default async function EditSeriesPage({ params }: Props) {
  const { slug } = await params;
  const [series] = await Promise.all([getSeriesDetail(slug), requireAdmin()]);

  return (
    <Layout>
      <SeriesForm mode="edit" initialData={series} />
    </Layout>
  );
}
