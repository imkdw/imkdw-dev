'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { getApiClient } from '@imkdw-dev/api-client';
import { ISeoSeriesDto, ISeoArticleDto } from '@imkdw-dev/types';

export const getSeoSeriesList = withErrorHandling(async () => {
  return getApiClient().get<ISeoSeriesDto[]>(buildEndpoint('GET_SEO_SERIES_LIST'));
});

export const getSeoArticlesList = withErrorHandling(async () => {
  return getApiClient().get<ISeoArticleDto[]>(buildEndpoint('GET_SEO_ARTICLES_LIST'));
});
