'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { getApiClient } from '@imkdw-dev/api-client';
import { IResponseGetStatsDto } from '@imkdw-dev/types';

export const getStats = withErrorHandling(async () => {
  return getApiClient().get<IResponseGetStatsDto>(buildEndpoint('GET_STATS'));
});
