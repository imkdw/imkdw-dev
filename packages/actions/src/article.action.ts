'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import { IRequestGetArticlesDto, IResponseGetArticlesDto } from '@imkdw-dev/types';

export const getArticles = withErrorHandling(async (params: IRequestGetArticlesDto) => {
  return apiClient.get<IResponseGetArticlesDto>(buildEndpoint('GET_ARTICLES'), {
    query: {
      ...params,
    },
  });
});