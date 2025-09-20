'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint } from '@imkdw-dev/consts';
import { IMemberDto } from '@imkdw-dev/types';

export async function getCurrentMember(): Promise<IMemberDto | null> {
  try {
    return await apiClient.get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch (err) {
    return null;
  }
}

export async function getMember(memberId: string): Promise<IMemberDto> {
  return apiClient.get<IMemberDto>(buildEndpoint('FIND_MEMBER', { memberId }));
}
