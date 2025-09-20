import { AUTH_EXCEPTION_CODES } from './auth-exception-codes';

type AuthExceptionCode = (typeof AUTH_EXCEPTION_CODES)[keyof typeof AUTH_EXCEPTION_CODES];

export const AUTH_EXCEPTION_MESSAGES: Record<AuthExceptionCode, string> = {
  [AUTH_EXCEPTION_CODES.AUTHORIZATION_FAILED]: '인증에 실패했습니다. 다시 로그인해주세요.',
} as const;