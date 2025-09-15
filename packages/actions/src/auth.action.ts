'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';

export async function getOAuthUrl(provider: OAuthProvider) {
  return await apiClient.get(buildEndpoint('GET_OAUTH_URL', { provider }));
}