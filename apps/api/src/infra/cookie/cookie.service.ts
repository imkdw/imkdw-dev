import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { MyConfigService } from '@/config/my-config.service';
import { APP_ENV } from '@imkdw-dev/consts';
import { SetCookieParams } from '@/infra/cookie/cookie.type';
import { COOKIE_SAME_SITE } from '@/infra/cookie/cookie.const';

@Injectable()
export class CookieService {
  private readonly env: string;
  private readonly cookieDomain: string;

  constructor(private readonly myConfigService: MyConfigService) {
    this.env = this.myConfigService.get('APP_ENV');
    this.cookieDomain = this.myConfigService.get('AUTH_COOKIE_DOMAIN');
  }

  setCookie(params: SetCookieParams): void {
    const { key, value, maxAge, res } = params;
    res.cookie(key, value, {
      domain: this.cookieDomain,
      httpOnly: true,
      path: '/',
      secure: this.generateSecure(),
      maxAge,
      sameSite: COOKIE_SAME_SITE.STRICT,
    });
  }

  clearCookie(cookies: string[], res: Response) {
    cookies.forEach(cookie => {
      res.clearCookie(cookie, {
        domain: this.cookieDomain,
        httpOnly: true,
        path: '/',
        secure: this.generateSecure(),
        sameSite: COOKIE_SAME_SITE.STRICT,
      });
    });
  }

  private generateSecure(): boolean {
    switch (this.env) {
      case APP_ENV.DEVELOPMENT:
      case APP_ENV.PRODUCTION:
        return true;
      default:
        return false;
    }
  }
}
