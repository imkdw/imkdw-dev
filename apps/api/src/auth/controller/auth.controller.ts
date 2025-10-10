import { ACCESS_TOKEN_KEY } from '@/auth/consts/auth.const';
import { RefreshTokenUseCase } from '@/auth/use-case/refresh-token.use-case';
import { RefreshToken } from '@/common/decorator/refresh-token.decorator';
import { COOKIE_MAX_AGE } from '@/infra/cookie/cookie.const';
import { CookieService } from '@/infra/cookie/cookie.service';
import { Controller, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly cookieService: CookieService
  ) {}

  refreshToken(@RefreshToken() refreshToken: string, @Res({ passthrough: true }) res: Response) {
    const accessToken = this.refreshTokenUseCase.execute(refreshToken);

    this.cookieService.setCookie({
      key: ACCESS_TOKEN_KEY,
      value: accessToken,
      maxAge: COOKIE_MAX_AGE.HOUR_1,
      res,
    });
  }
}
