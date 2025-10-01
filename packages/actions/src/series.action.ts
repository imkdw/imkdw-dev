'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import { IRequestGetSeriesListDto, IResponseGetSeriesListDto, ISeriesDetailDto } from '@imkdw-dev/types';

export const getSeriesList = withErrorHandling(async (params: IRequestGetSeriesListDto) => {
  return apiClient.get<IResponseGetSeriesListDto>(buildEndpoint('GET_SERIES_LIST'), {
    query: {
      ...params,
    },
  });
});

export const getSeriesDetail = withErrorHandling(async (slug: string) => {
  return apiClient.get<ISeriesDetailDto>(buildEndpoint('GET_SERIES_DETAIL', { slug }));
});
