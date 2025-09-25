export const ARTICLE_ENDPOINTS = {
  GET_ARTICLES: 'articles',
  CREATE_ARTICLE: 'articles',
  UPDATE_ARTICLE: 'articles/:id',
  INCREMENT_VIEW_COUNT: 'articles/:id/view-count',
  DELETE_ARTICLE: 'articles/:id',
} as const;