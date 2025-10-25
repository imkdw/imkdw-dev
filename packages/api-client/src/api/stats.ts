import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from '../lib/error-handler';
import { getApiClient } from '../instance';
import { IResponseGetStatsDto } from '@imkdw-dev/types';

export const getStats = withErrorHandling(async () => {
  return getApiClient().get<IResponseGetStatsDto>(buildEndpoint('GET_STATS'));
});
