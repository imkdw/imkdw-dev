'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint } from '@imkdw-dev/consts';
import { IMemberDto } from '@imkdw-dev/types';

export async function getCurrentMember() {
  try {
    return await apiClient.get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch (err) {
    return null;
  }
}

export async function getMember(memberId: string) {
  return apiClient.get<IMemberDto>(buildEndpoint('FIND_MEMBER', { memberId }));
}
