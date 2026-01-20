import { AUTH_EXCEPTION_CODES, JWT_EXCEPTION_CODES, OAUTH_EXCEPTION_CODES } from '../auth';
import { MEMBER_EXCEPTION_CODES } from '../member';
import { ARTICLE_EXCEPTION_CODES } from '../article';
import { SERIES_EXCEPTION_CODES } from '../series';
import { ARTICLE_COMMENT_EXCEPTION_CODES } from '../article-comment';

export type { Locale as SupportedLocale } from '@imkdw-dev/i18n';

/**
 * 클라이언트 전용 예외 코드
 */
export const CLIENT_EXCEPTION_CODES = {
  NETWORK_ERROR: 'CLIENT-0001',
  REQUEST_TIMEOUT: 'CLIENT-0002',
  UNKNOWN_ERROR: 'CLIENT-0003',
} as const;

export type ClientExceptionCode = (typeof CLIENT_EXCEPTION_CODES)[keyof typeof CLIENT_EXCEPTION_CODES];

/**
 * 모든 예외 코드의 값 타입 (서버 + 클라이언트)
 */
export type ExceptionMessageCode =
  | (typeof AUTH_EXCEPTION_CODES)[keyof typeof AUTH_EXCEPTION_CODES]
  | (typeof JWT_EXCEPTION_CODES)[keyof typeof JWT_EXCEPTION_CODES]
  | (typeof OAUTH_EXCEPTION_CODES)[keyof typeof OAUTH_EXCEPTION_CODES]
  | (typeof MEMBER_EXCEPTION_CODES)[keyof typeof MEMBER_EXCEPTION_CODES]
  | (typeof ARTICLE_EXCEPTION_CODES)[keyof typeof ARTICLE_EXCEPTION_CODES]
  | (typeof SERIES_EXCEPTION_CODES)[keyof typeof SERIES_EXCEPTION_CODES]
  | (typeof ARTICLE_COMMENT_EXCEPTION_CODES)[keyof typeof ARTICLE_COMMENT_EXCEPTION_CODES]
  | ClientExceptionCode;
