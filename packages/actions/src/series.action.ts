'use server';

import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from './lib';
import { apiClient } from '@imkdw-dev/api-client';
import {
  IRequestGetSeriesListDto,
  IResponseGetSeriesListDto,
  ISeriesDetailDto,
  ICreateSeriesDto,
  IResponseCreateSeriesDto,
  IUpdateSeriesDto,
} from '@imkdw-dev/types';

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

export const createSeries = withErrorHandling(async (data: ICreateSeriesDto) => {
  return apiClient.post<ICreateSeriesDto, IResponseCreateSeriesDto>(buildEndpoint('CREATE_SERIES'), data);
});

export const updateSeries = withErrorHandling(async (slug: string, data: IUpdateSeriesDto) => {
  return apiClient.patch<IUpdateSeriesDto>(buildEndpoint('UPDATE_SERIES', { slug }), data);
});

export const deleteSeries = withErrorHandling(async (slug: string) => {
  return apiClient.delete(buildEndpoint('DELETE_SERIES', { slug }));
});
