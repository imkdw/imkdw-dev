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
