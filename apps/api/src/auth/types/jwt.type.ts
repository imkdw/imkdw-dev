export type JwtTokenType = 'ACCESS' | 'REFRESH';

export interface CreateJwtPayload {
  id: string;
  role: string;
}

export interface VerifiedJwtPayload extends CreateJwtPayload {
  iat: number;
  exp: number;
}

export interface DecodedJwtPayload {
  id?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface CreateJwtResult {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyJwtParams {
  token: string;
}
