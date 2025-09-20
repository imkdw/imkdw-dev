import { AUTH_EXCEPTION_MESSAGES } from './auth';
import { JWT_EXCEPTION_MESSAGES } from './auth';
import { OAUTH_EXCEPTION_MESSAGES } from './auth';
import { MEMBER_EXCEPTION_MESSAGES } from './member/member-exception-messages';
import { ARTICLE_EXCEPTION_MESSAGES } from './article/article-exception-messages';
import { SERIES_EXCEPTION_MESSAGES } from './series/series-exception-messages';
import { ARTICLE_COMMENT_EXCEPTION_MESSAGES } from './article-comment/article-comment-exception-messages';

export const EXCEPTION_MESSAGES = {
  ...AUTH_EXCEPTION_MESSAGES,
  ...JWT_EXCEPTION_MESSAGES,
  ...OAUTH_EXCEPTION_MESSAGES,
  ...MEMBER_EXCEPTION_MESSAGES,
  ...ARTICLE_EXCEPTION_MESSAGES,
  ...SERIES_EXCEPTION_MESSAGES,
  ...ARTICLE_COMMENT_EXCEPTION_MESSAGES,
} as const;