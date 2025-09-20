'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint } from '@imkdw-dev/consts';
import { IMemberDto } from '@imkdw-dev/types';
import { withErrorHandling } from './lib';

export const getCurrentMember = withErrorHandling(async (): Promise<IMemberDto | null> => {
  try {
    return await apiClient.get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch (err) {
    return null;
  }
});

export const getMember = withErrorHandling(async (memberId: string): Promise<IMemberDto> => {
  return apiClient.get<IMemberDto>(buildEndpoint('FIND_MEMBER', { memberId }));
});
