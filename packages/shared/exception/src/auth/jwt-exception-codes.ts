export const JWT_EXCEPTION_CODES = {
  JWT_EXPIRED: 'JWT-0001',
  INVALID_JWT: 'JWT-0002',
} as const;

type JwtExceptionCode = (typeof JWT_EXCEPTION_CODES)[keyof typeof JWT_EXCEPTION_CODES];

export const JWT_EXCEPTION_MESSAGES_KO: Record<JwtExceptionCode, string> = {
  [JWT_EXCEPTION_CODES.JWT_EXPIRED]: '토큰이 만료되었습니다. 다시 로그인해주세요.',
  [JWT_EXCEPTION_CODES.INVALID_JWT]: '올바르지 않은 토큰입니다. 다시 로그인해주세요.',
} as const;

export const JWT_EXCEPTION_MESSAGES_EN: Record<JwtExceptionCode, string> = {
  [JWT_EXCEPTION_CODES.JWT_EXPIRED]: 'Token has expired. Please log in again.',
  [JWT_EXCEPTION_CODES.INVALID_JWT]: 'Invalid token. Please log in again.',
} as const;
