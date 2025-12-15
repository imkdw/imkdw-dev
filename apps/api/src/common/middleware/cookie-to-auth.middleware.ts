import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieToAuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { accessToken } = this.parseJwtFromCookie(req.headers.cookie ?? '');

    req.headers.authorization = `Bearer ${accessToken}`;
    next();
  }

  private parseJwtFromCookie(cookie: string) {
    const tokenCookies: { [key: string]: string } = {};

    cookie.split(';').forEach((_cookie: string) => {
      const trimCookie = _cookie.trim();
      const mid = trimCookie.indexOf('=');
      const [key, value] = [trimCookie.slice(0, mid), trimCookie.slice(mid + 1)];
      tokenCookies[key] = value;
    });

    const accessToken = tokenCookies['accessToken'] ?? '';
    const refreshToken = tokenCookies['refreshToken'] ?? '';

    return { accessToken, refreshToken };
  }
}
