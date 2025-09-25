export const ARTICLE_COMMENT_ENDPOINTS = {
  CREATE_ARTICLE_COMMENT: 'articles/:articleId/comments',
  UPDATE_ARTICLE_COMMENT: 'articles/:articleId/comments/:commentId',
  DELETE_ARTICLE_COMMENT: 'articles/:articleId/comments/:commentId',
  CREATE_ARTICLE_REPLY: 'articles/:articleId/comments/:commentId/replies',
} as const;