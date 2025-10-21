'use server';

import { getApiClient } from '@imkdw-dev/api-client';
import { buildEndpoint } from '@imkdw-dev/consts';
import { IMemberDto, IMemberStatsDto, IUpdateMemberDto } from '@imkdw-dev/types';
import { withErrorHandling } from './lib';

export const getCurrentMember = withErrorHandling(async (): Promise<IMemberDto | null> => {
  try {
    return await getApiClient().get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch {
    return null;
  }
});

export const getMember = withErrorHandling(async (memberId: string): Promise<IMemberDto> => {
  return getApiClient().get<IMemberDto>(buildEndpoint('FIND_MEMBER', { memberId }));
});

export const getMemberStats = withErrorHandling(async (memberId: string): Promise<IMemberStatsDto> => {
  return getApiClient().get<IMemberStatsDto>(buildEndpoint('GET_MEMBER_STATS', { memberId }));
});

export const updateMember = withErrorHandling(async (memberId: string, data: IUpdateMemberDto): Promise<void> => {
  await getApiClient().put<IUpdateMemberDto>(buildEndpoint('UPDATE_MEMBER', { memberId }), data);
});
