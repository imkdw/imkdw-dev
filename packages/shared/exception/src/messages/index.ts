import {
  AUTH_EXCEPTION_MESSAGES_KO,
  AUTH_EXCEPTION_MESSAGES_EN,
  JWT_EXCEPTION_MESSAGES_KO,
  JWT_EXCEPTION_MESSAGES_EN,
  OAUTH_EXCEPTION_MESSAGES_KO,
  OAUTH_EXCEPTION_MESSAGES_EN,
} from '../auth';
import { MEMBER_EXCEPTION_MESSAGES_KO, MEMBER_EXCEPTION_MESSAGES_EN } from '../member';
import { ARTICLE_EXCEPTION_MESSAGES_KO, ARTICLE_EXCEPTION_MESSAGES_EN } from '../article';
import { SERIES_EXCEPTION_MESSAGES_KO, SERIES_EXCEPTION_MESSAGES_EN } from '../series';
import { ARTICLE_COMMENT_EXCEPTION_MESSAGES_KO, ARTICLE_COMMENT_EXCEPTION_MESSAGES_EN } from '../article-comment';
import { CLIENT_EXCEPTION_CODES } from './types';
import type { ExceptionMessageCode, SupportedLocale, ClientExceptionCode } from './types';

export type { ExceptionMessageCode, SupportedLocale, ClientExceptionCode };
export { CLIENT_EXCEPTION_CODES };

/**
 * 클라이언트 전용 예외 메시지 (한국어)
 */
const CLIENT_EXCEPTION_MESSAGES_KO = {
  [CLIENT_EXCEPTION_CODES.NETWORK_ERROR]: '서버와의 통신에 실패했습니다.',
  [CLIENT_EXCEPTION_CODES.REQUEST_TIMEOUT]: '요청 시간이 초과되었습니다.',
  [CLIENT_EXCEPTION_CODES.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
} as const;

/**
 * 클라이언트 전용 예외 메시지 (영어)
 */
const CLIENT_EXCEPTION_MESSAGES_EN = {
  [CLIENT_EXCEPTION_CODES.NETWORK_ERROR]: 'Failed to connect to the server.',
  [CLIENT_EXCEPTION_CODES.REQUEST_TIMEOUT]: 'Request timed out.',
  [CLIENT_EXCEPTION_CODES.UNKNOWN_ERROR]: 'An unknown error occurred.',
} as const;

/**
 * 한국어 에러 메시지 (도메인별 메시지 합침)
 */
export const EXCEPTION_MESSAGES_KO: Record<ExceptionMessageCode, string> = {
  ...AUTH_EXCEPTION_MESSAGES_KO,
  ...JWT_EXCEPTION_MESSAGES_KO,
  ...OAUTH_EXCEPTION_MESSAGES_KO,
  ...MEMBER_EXCEPTION_MESSAGES_KO,
  ...ARTICLE_EXCEPTION_MESSAGES_KO,
  ...SERIES_EXCEPTION_MESSAGES_KO,
  ...ARTICLE_COMMENT_EXCEPTION_MESSAGES_KO,
  ...CLIENT_EXCEPTION_MESSAGES_KO,
} as const;

/**
 * 영어 에러 메시지 (도메인별 메시지 합침)
 */
export const EXCEPTION_MESSAGES_EN: Record<ExceptionMessageCode, string> = {
  ...AUTH_EXCEPTION_MESSAGES_EN,
  ...JWT_EXCEPTION_MESSAGES_EN,
  ...OAUTH_EXCEPTION_MESSAGES_EN,
  ...MEMBER_EXCEPTION_MESSAGES_EN,
  ...ARTICLE_EXCEPTION_MESSAGES_EN,
  ...SERIES_EXCEPTION_MESSAGES_EN,
  ...ARTICLE_COMMENT_EXCEPTION_MESSAGES_EN,
  ...CLIENT_EXCEPTION_MESSAGES_EN,
} as const;

/**
 * 언어별 에러 메시지 맵
 */
export const EXCEPTION_MESSAGES_BY_LOCALE = {
  ko: EXCEPTION_MESSAGES_KO,
  en: EXCEPTION_MESSAGES_EN,
} as const;

/**
 * 기본 에러 메시지 (한국어)
 * 기존 EXCEPTION_MESSAGES와 호환성 유지
 */
export const EXCEPTION_MESSAGES = EXCEPTION_MESSAGES_KO;

/**
 * 특정 로케일의 에러 메시지를 가져옵니다.
 */
export function getExceptionMessage(code: ExceptionMessageCode, locale: SupportedLocale = 'ko'): string {
  return EXCEPTION_MESSAGES_BY_LOCALE[locale][code];
}
