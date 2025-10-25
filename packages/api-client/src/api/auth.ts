import { getApiClient } from '../instance';
import { buildEndpoint, OAuthProvider } from '@imkdw-dev/consts';
import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';
import { withErrorHandling } from '../lib/error-handler';

export const getOAuthUrl = withErrorHandling(async (provider: OAuthProvider, redirectUrl: string) => {
  return getApiClient().get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
    query: {
      redirectUrl,
    },
  });
});
