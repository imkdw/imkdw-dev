import { apiClient } from '../client';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { IMemberDto } from '@imkdw-dev/types';

export const memberApi = {
  getCurrentMember: async (token: string): Promise<IMemberDto> => {
    return apiClient.get<IMemberDto>(API_ENDPOINTS.GET_CURRENT_MEMBER, token);
  },
};