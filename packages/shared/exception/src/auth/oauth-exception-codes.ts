export const OAUTH_EXCEPTION_CODES = {
  NOT_SUPPORTED_OAUTH_PROVIDER: 'OAUTH-0001',
} as const;

type OauthExceptionCode = (typeof OAUTH_EXCEPTION_CODES)[keyof typeof OAUTH_EXCEPTION_CODES];

export const OAUTH_EXCEPTION_MESSAGES: Record<OauthExceptionCode, string> = {
  [OAUTH_EXCEPTION_CODES.NOT_SUPPORTED_OAUTH_PROVIDER]: '지원하지 않는 OAuth 제공자입니다.',
} as const;
