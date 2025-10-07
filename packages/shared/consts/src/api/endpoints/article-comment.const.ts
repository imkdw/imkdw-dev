export const ARTICLE_COMMENT_ENDPOINTS = {
  CREATE_ARTICLE_COMMENT: 'articles/:articleSlug/comments',
  UPDATE_ARTICLE_COMMENT: 'articles/:articleSlug/comments/:commentId',
  DELETE_ARTICLE_COMMENT: 'articles/:articleSlug/comments/:commentId',
  CREATE_ARTICLE_REPLY: 'articles/:articleSlug/comments/:commentId/replies',
} as const;
