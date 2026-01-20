import { getApiClient } from '../instance';
import { buildEndpoint } from '@imkdw-dev/consts';
import { IMemberDto, IMemberStatsDto, IUpdateMemberDto } from '@imkdw-dev/types';
import { withErrorHandling } from '../lib/error-handler';

export const getCurrentMember = async (): Promise<IMemberDto | null> => {
  try {
    return await getApiClient().get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch {
    // 401 에러의 경우 미인증 사용자이므로 null 반환 (정상적인 흐름)
    // 다른 에러도 여기서 처리하여 UI가 깨지지 않도록 함
    return null;
  }
};

export const getMember = withErrorHandling(async (memberId: string): Promise<IMemberDto> => {
  return getApiClient().get<IMemberDto>(buildEndpoint('FIND_MEMBER', { memberId }));
});

export const getMemberStats = withErrorHandling(async (memberId: string): Promise<IMemberStatsDto> => {
  return getApiClient().get<IMemberStatsDto>(buildEndpoint('GET_MEMBER_STATS', { memberId }));
});

export const updateMember = withErrorHandling(async (memberId: string, data: IUpdateMemberDto): Promise<void> => {
  await getApiClient().put<IUpdateMemberDto>(buildEndpoint('UPDATE_MEMBER', { memberId }), data);
});
