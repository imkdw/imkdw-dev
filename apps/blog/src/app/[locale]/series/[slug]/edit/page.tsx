import { Layout } from '@/components/layout';
import { SeriesForm } from '@/components/series/series-form';
import { getSeriesDetail, getCurrentMember } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

interface Props {
  params: Promise<{ slug: string }>;
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
