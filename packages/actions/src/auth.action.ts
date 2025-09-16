'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';

export async function getOAuthUrl(provider: OAuthProvider, redirectUrl: string) {
  const response = await apiClient.get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
    query: {
      redirectUrl,
    },
  });
  console.log('response', response);

  return response;
}
