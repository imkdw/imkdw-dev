import { OAuthStrategyFactory } from '@/auth/factory/oauth-strategy.factory';
import { Public } from '@/common/decorator/public.decorator';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import * as Swagger from '@/auth/swagger/oauth.swagger';
import { Response } from 'express';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/auth/consts/auth.const';
import { ResponseGetOAuthUrlDto } from '@/auth/dto/get-oauth-url.dto';
import { CookieService } from '@/infra/cookie/cookie.service';
import { COOKIE_MAX_AGE } from '@/infra/cookie/cookie.const';
import { OAuthProvider } from '@imkdw-dev/consts';

@ApiTags('소셜로그인')
@Controller('oauth')
@Public()
export class OAuthController {
  constructor(
    private readonly oauthStrategyFactory: OAuthStrategyFactory,
    private readonly cookieService: CookieService
  ) {}

  @Swagger.getOAuthUrl('소셜로그인 URL 발급')
  @Get(':provider/authorization')
  async getOAuthUrl(
    @Query('redirectUrl') redirectUrl: string,
    @Param('provider') provider: OAuthProvider
  ): Promise<ResponseGetOAuthUrlDto> {
    const strategy = this.oauthStrategyFactory.getStrategy(provider);
    const url = strategy.getAuthorizationUrl(redirectUrl);
    return { url };
  }

  @ApiExcludeEndpoint()
  @Get(':provider/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Param('provider') provider: OAuthProvider,
    @Res({ passthrough: true }) res: Response
  ) {
    const strategy = this.oauthStrategyFactory.getStrategy(provider);
    const { accessToken, refreshToken, redirectUrl } = await strategy.signIn(code, state);
    this.setToken(accessToken, refreshToken, res);
    return res.redirect(redirectUrl);
  }

  private setToken(accessToken: string, refreshToken: string, res: Response) {
    this.cookieService.setCookie({
      key: ACCESS_TOKEN_KEY,
      value: accessToken,
      maxAge: COOKIE_MAX_AGE.HOUR_1,
      res,
    });

    if (refreshToken) {
      this.cookieService.setCookie({
        key: REFRESH_TOKEN_KEY,
        value: refreshToken,
        maxAge: COOKIE_MAX_AGE.DAY_30,
        res,
      });
    }
  }
}
