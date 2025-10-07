'use server';

import { apiClient } from '@imkdw-dev/api-client';
import { buildEndpoint } from '@imkdw-dev/consts';
import { ICreateArticleCommentDto, IUpdateArticleCommentDto } from '@imkdw-dev/types';
import { withErrorHandling } from './lib';

export const createArticleComment = withErrorHandling(
  async (articleId: string, data: ICreateArticleCommentDto): Promise<void> => {
    await apiClient.post<ICreateArticleCommentDto, void>(buildEndpoint('CREATE_ARTICLE_COMMENT', { articleId }), data);
  }
);

export const updateArticleComment = withErrorHandling(
  async (articleId: string, commentId: string, data: IUpdateArticleCommentDto): Promise<void> => {
    await apiClient.put<IUpdateArticleCommentDto, void>(
      buildEndpoint('UPDATE_ARTICLE_COMMENT', { articleId, commentId }),
      data
    );
  }
);

export const deleteArticleComment = withErrorHandling(async (articleId: string, commentId: string): Promise<void> => {
  await apiClient.delete<void>(buildEndpoint('DELETE_ARTICLE_COMMENT', { articleId, commentId }));
});

export const createArticleReply = withErrorHandling(
  async (articleId: string, commentId: string, data: ICreateArticleCommentDto): Promise<void> => {
    await apiClient.post<ICreateArticleCommentDto, void>(
      buildEndpoint('CREATE_ARTICLE_REPLY', { articleId, commentId }),
      data
    );
  }
);
