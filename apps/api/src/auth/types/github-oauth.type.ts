export interface GithubAuthorizationParams {
  client_id: string;
  redirect_uri: string;
  state: string;

  scope: string;
}

export interface GithubGetAccessTokenBody {
  client_id: string;
  client_secret: string;
  code: string;
}

export interface GithubGetAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GithubUserInfoResponse {
  id: number;
  email: string;
  avatar_url: string;
}
