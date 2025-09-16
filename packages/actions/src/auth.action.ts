'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto, IMemberDto } from '@imkdw-dev/types';

export async function getOAuthUrl(provider: OAuthProvider, redirectUrl: string) {
  return apiClient.get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
    query: {
      redirectUrl,
    },
  });
}

export async function getCurrentMember() {
  try {
    return await apiClient.get<IMemberDto | null>(buildEndpoint('GET_CURRENT_MEMBER'));
  } catch (err) {
    return null;
  }
}
