import { buildEndpoint } from '@imkdw-dev/consts';
import { withErrorHandling } from '../lib/error-handler';
import {
  IRequestGetArticlesDto,
  IResponseGetArticlesDto,
  ICreateArticleDto,
  IResponseCreateArticleDto,
  IResponseGetArticleDto,
  IUpdateArticleDto,
} from '@imkdw-dev/types';
import { getApiClient } from '../instance';

export const getArticles = withErrorHandling(async (params: IRequestGetArticlesDto) => {
  return getApiClient().get<IResponseGetArticlesDto>(buildEndpoint('GET_ARTICLES'), {
    query: { ...params },
  });
});

export const getArticle = withErrorHandling(async (slug: string) => {
  return getApiClient().get<IResponseGetArticleDto>(buildEndpoint('GET_ARTICLE', { slug }));
});

export const createArticle = withErrorHandling(async (data: ICreateArticleDto) => {
  return getApiClient().post<ICreateArticleDto, IResponseCreateArticleDto>(buildEndpoint('CREATE_ARTICLE'), data);
});

export const updateArticle = withErrorHandling(async (slug: string, data: IUpdateArticleDto): Promise<void> => {
  await getApiClient().put<IUpdateArticleDto>(buildEndpoint('UPDATE_ARTICLE', { slug }), data);
});

export const deleteArticle = withErrorHandling(async (slug: string): Promise<void> => {
  await getApiClient().delete(buildEndpoint('DELETE_ARTICLE', { slug }));
});

export const incrementViewCount = withErrorHandling(async (slug: string): Promise<void> => {
  await getApiClient().patch(buildEndpoint('INCREMENT_VIEW_COUNT', { slug }));
});
