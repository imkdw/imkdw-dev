import { OAUTH_PROVIDER } from '@/auth/consts/oauth.const';

export type OAuthProvider = (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];

export interface OAuthUrl {
  authorization: string;
  token: string;
  userInfo: string;
}

export interface OAuthSignInResult {
  accessToken: string;
  refreshToken: string;
  redirectUrl: string;
}
