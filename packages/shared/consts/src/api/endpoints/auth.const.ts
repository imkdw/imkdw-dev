export const AUTH_ENDPOINTS = {
  GET_OAUTH_URL: 'oauth/:provider/authorization',
  OAUTH_CALLBACK: 'oauth/:provider/callback',
  REFRESH_TOKEN: 'auth/refresh-token',
} as const;
