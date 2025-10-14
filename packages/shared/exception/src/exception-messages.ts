import { AUTH_EXCEPTION_MESSAGES } from './auth/auth-exception-codes';
import { JWT_EXCEPTION_MESSAGES } from './auth/jwt-exception-codes';
import { OAUTH_EXCEPTION_MESSAGES } from './auth/oauth-exception-codes';
import { MEMBER_EXCEPTION_MESSAGES } from './member/member-exception-codes';
import { ARTICLE_EXCEPTION_MESSAGES } from './article/article-exception-codes';
import { SERIES_EXCEPTION_MESSAGES } from './series/series-exception-codes';
import { ARTICLE_COMMENT_EXCEPTION_MESSAGES } from './article-comment/article-comment-exception-codes';

export const EXCEPTION_MESSAGES = {
  ...AUTH_EXCEPTION_MESSAGES,
  ...JWT_EXCEPTION_MESSAGES,
  ...OAUTH_EXCEPTION_MESSAGES,
  ...MEMBER_EXCEPTION_MESSAGES,
  ...ARTICLE_EXCEPTION_MESSAGES,
  ...SERIES_EXCEPTION_MESSAGES,
  ...ARTICLE_COMMENT_EXCEPTION_MESSAGES,
} as const;