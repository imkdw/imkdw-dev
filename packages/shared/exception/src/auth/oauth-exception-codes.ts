export const OAUTH_EXCEPTION_CODES = {
  NOT_SUPPORTED_OAUTH_PROVIDER: 'OAUTH-0001',
} as const;

type OauthExceptionCode = (typeof OAUTH_EXCEPTION_CODES)[keyof typeof OAUTH_EXCEPTION_CODES];

export const OAUTH_EXCEPTION_MESSAGES_KO: Record<OauthExceptionCode, string> = {
  [OAUTH_EXCEPTION_CODES.NOT_SUPPORTED_OAUTH_PROVIDER]: '지원하지 않는 OAuth 제공자입니다.',
} as const;

export const OAUTH_EXCEPTION_MESSAGES_EN: Record<OauthExceptionCode, string> = {
  [OAUTH_EXCEPTION_CODES.NOT_SUPPORTED_OAUTH_PROVIDER]: 'Unsupported OAuth provider.',
} as const;
