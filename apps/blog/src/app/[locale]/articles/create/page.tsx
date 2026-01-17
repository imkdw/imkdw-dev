import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { ArticleForm } from '@/components/article/article-form';
import { requireAdmin } from '@/lib/require-admin';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@imkdw-dev/i18n';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles.form' });
  return {
    title: t('createTitle'),
    robots: { index: false, follow: false },
  };
}

export default async function CreateArticlePage() {
  await requireAdmin();

  return (
    <Layout>
      <ArticleForm mode="create" />
    </Layout>
  );
}
