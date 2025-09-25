'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import { IResponseGetStatsDto } from '@imkdw-dev/types';

export const getStats = withErrorHandling(async () => {
  return apiClient.get<IResponseGetStatsDto>(buildEndpoint('GET_STATS'));
});
