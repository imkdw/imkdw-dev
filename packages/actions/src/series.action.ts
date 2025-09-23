import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import { IRequestGetSeriesListDto, IResponseGetSeriesListDto } from '@imkdw-dev/types';

export const getSeriesList = withErrorHandling(async (params: IRequestGetSeriesListDto) => {
  return apiClient.get<IResponseGetSeriesListDto>(buildEndpoint('GET_SERIES_LIST'), {
    query: {
      ...params,
    },
  });
});

// export const getOAuthUrl = withErrorHandling(async (provider: OAuthProvider, redirectUrl: string) => {
//   return apiClient.get<IResponseGetOAuthUrlDto>(buildEndpoint('GET_OAUTH_URL', { provider }), {
//     query: {
//       redirectUrl,
//     },
//   });
// });
