import { getApiClient } from '../instance';
import { buildEndpoint } from '@imkdw-dev/consts';
import { ICreateArticleCommentDto, IResponseGetArticleCommentsDto, IUpdateArticleCommentDto } from '@imkdw-dev/types';
import { withErrorHandling } from '../lib/error-handler';

export const createArticleComment = withErrorHandling(
  async (articleSlug: string, data: ICreateArticleCommentDto): Promise<void> => {
    await getApiClient().post<ICreateArticleCommentDto>(buildEndpoint('CREATE_ARTICLE_COMMENT', { articleSlug }), data);
  }
);

export const updateArticleComment = withErrorHandling(
  async (articleSlug: string, commentId: string, data: IUpdateArticleCommentDto): Promise<void> => {
    await getApiClient().put<IUpdateArticleCommentDto>(
      buildEndpoint('UPDATE_ARTICLE_COMMENT', { articleSlug, commentId }),
      data
    );
  }
);

export const deleteArticleComment = withErrorHandling(async (articleSlug: string, commentId: string): Promise<void> => {
  await getApiClient().delete(buildEndpoint('DELETE_ARTICLE_COMMENT', { articleSlug, commentId }));
});

export const getArticleComments = withErrorHandling(
  async (articleSlug: string): Promise<IResponseGetArticleCommentsDto> => {
    return getApiClient().get<IResponseGetArticleCommentsDto>(buildEndpoint('GET_ARTICLE_COMMENTS', { articleSlug }));
  }
);
