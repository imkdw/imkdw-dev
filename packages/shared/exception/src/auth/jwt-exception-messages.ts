import { JWT_EXCEPTION_CODES } from './jwt-exception-codes';

type JwtExceptionCode = (typeof JWT_EXCEPTION_CODES)[keyof typeof JWT_EXCEPTION_CODES];

export const JWT_EXCEPTION_MESSAGES: Record<JwtExceptionCode, string> = {
  [JWT_EXCEPTION_CODES.JWT_EXPIRED]: '토큰이 만료되었습니다. 다시 로그인해주세요.',
  [JWT_EXCEPTION_CODES.INVALID_JWT]: '올바르지 않은 토큰입니다. 다시 로그인해주세요.',
} as const;