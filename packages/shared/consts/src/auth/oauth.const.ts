export const OAUTH_PROVIDER = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const;

export type OAuthProvider = (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];
