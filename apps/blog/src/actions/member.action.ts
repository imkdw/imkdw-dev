'use server';

import { cookies } from 'next/headers';
import { memberApi } from '@/libs/api/member/member.api';
import { IMemberDto } from '@imkdw-dev/types';

export async function getCurrentMember(): Promise<IMemberDto | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return null;
    }

    const member = await memberApi.getCurrentMember(token);
    return member;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to get current member:', error);
    return null;
  }
}