'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';
import { withErrorHandling } from './lib';

export const getOAuthUrl = withErrorHandling(async (provider: OAuthProvider, redirectUrl: string) => {
  return apiClient.get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
    query: {
      redirectUrl,
    },
  });
});
