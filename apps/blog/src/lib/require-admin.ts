import { getCurrentMember } from '@imkdw-dev/api-client';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { forbidden } from 'next/navigation';

export async function requireAdmin(): Promise<void> {
  const currentMember = await getCurrentMember();
  if (!currentMember || currentMember.role !== MEMBER_ROLE.ADMIN) {
    forbidden();
  }
}
