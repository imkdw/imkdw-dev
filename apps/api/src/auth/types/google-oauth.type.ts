export interface GoogleAuthorizationParams {
  client_id: string;
  redirect_uri: string;
  response_type: 'code';
  scope: string;
  state: string;
}

export interface GoogleGetAccessTokenBody {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: 'authorization_code';
  redirect_uri: string;
}

export interface GoogleGetAccessTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
}

export interface GoogleUserInfoResponse {
  sub: string;
  email: string;
  name: string;
  picture: string;
}
