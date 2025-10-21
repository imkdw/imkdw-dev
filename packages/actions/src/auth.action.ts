'use server';

import { cookies } from 'next/headers';
import { getApiClient } from '@imkdw-dev/api-client';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';
import { withErrorHandling } from './lib';

export const getOAuthUrl = withErrorHandling(async (provider: OAuthProvider, redirectUrl: string) => {
  return getApiClient().get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
    query: {
      redirectUrl,
    },
  });
});

export const logout = withErrorHandling(async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
});
