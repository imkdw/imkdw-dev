import { APP_ENDPOINTS } from './app.const';
import { ARTICLE_ENDPOINTS } from './article.const';
import { ARTICLE_COMMENT_ENDPOINTS } from './article-comment.const';
import { AUTH_ENDPOINTS } from './auth.const';
import { MEMBER_ENDPOINTS } from './member.const';
import { SERIES_ENDPOINTS } from './series.const';
import { STATS_ENDPOINTS } from './stats.const';
import { TAG_ENDPOINTS } from './tag.const';
import { STORAGE_ENDPOINTS } from './storage.const';

export const API_ENDPOINTS = {
  ...APP_ENDPOINTS,
  ...ARTICLE_ENDPOINTS,
  ...ARTICLE_COMMENT_ENDPOINTS,
  ...AUTH_ENDPOINTS,
  ...MEMBER_ENDPOINTS,
  ...SERIES_ENDPOINTS,
  ...STATS_ENDPOINTS,
  ...TAG_ENDPOINTS,
  ...STORAGE_ENDPOINTS,
} as const;
