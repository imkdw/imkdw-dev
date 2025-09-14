import { parseJwtFromCookie } from '@/common/utils/authorization.util';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieToAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = parseJwtFromCookie(req.headers.cookie ?? '');
    req.headers.authorization = `Bearer ${accessToken}`;
    next();
  }
}
