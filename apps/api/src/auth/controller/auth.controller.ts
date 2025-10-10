import { ACCESS_TOKEN_KEY } from '@/auth/consts/auth.const';
import { RefreshTokenUseCase } from '@/auth/use-case/refresh-token.use-case';
import { RefreshToken } from '@/common/decorator/refresh-token.decorator';
import { COOKIE_MAX_AGE } from '@/infra/cookie/cookie.const';
import { CookieService } from '@/infra/cookie/cookie.service';
import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import * as Swagger from '@/auth/swagger/auth.swagger';
import { Public } from '@/common/decorator/public.decorator';

@ApiTags('인증')
@Controller()
export class AuthController {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly cookieService: CookieService
  ) {}

  @Swagger.refreshToken('토큰 갱신')
  @Public()
  @Post(API_ENDPOINTS.REFRESH_TOKEN)
  @HttpCode(HttpStatus.NO_CONTENT)
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
