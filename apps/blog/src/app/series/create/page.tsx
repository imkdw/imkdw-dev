import { Layout } from '@imkdw-dev/ui';
import { SeriesForm } from '@/components/series/series-form';
import { getCurrentMember } from '@imkdw-dev/actions';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';

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
