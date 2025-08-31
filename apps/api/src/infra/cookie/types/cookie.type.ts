import { COOKIE_MAX_AGE, COOKIE_SAME_SITE } from '@/infra/cookie/const/cookie.const';
import { Response } from 'express';

export type CookieMaxAge = (typeof COOKIE_MAX_AGE)[keyof typeof COOKIE_MAX_AGE];

export type CookieSameSite = (typeof COOKIE_SAME_SITE)[keyof typeof COOKIE_SAME_SITE];

export interface SetCookieParams {
  key: string;
  value: string;
  maxAge: CookieMaxAge;
  res: Response;
}
