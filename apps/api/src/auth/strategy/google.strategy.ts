import { Inject, Injectable } from '@nestjs/common';

import { OAuthStrategy } from './oauth.strategy';

import { OAUTH_URL } from '@/auth/consts/oauth.const';
import { MyConfigService } from '@/config/my-config.service';
import { JwtService } from '@/auth/service/jwt.service';
import {
  GoogleAuthorizationParams,
  GoogleGetAccessTokenBody,
  GoogleGetAccessTokenResponse,
  GoogleUserInfoResponse,
} from '@/auth/types/google-oauth.type';
import { OAuthSignInResult } from '@/auth/types/oauth.type';
import { HttpService } from '@/infra/http/http.service';
import { HTTP_SERVICE } from '@/infra/http/http.const';
import { MemberAuthService } from '@/auth/service/member-auth.service';
import { OAUTH_PROVIDER } from '@imkdw-dev/consts';

@Injectable()
export class GoogleOAuthStrategy implements OAuthStrategy {
  private readonly url = OAUTH_URL['google'];
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly scope: string;

  constructor(
    @Inject(HTTP_SERVICE) private readonly httpService: HttpService,
    private readonly configService: MyConfigService,
    private readonly jwtService: JwtService,
    private readonly memberAuthService: MemberAuthService
  ) {
    this.clientId = this.configService.get('GOOGLE_CLIENT_ID');
    this.clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    this.redirectUrl = this.configService.get('GOOGLE_REDIRECT_URL');
    this.scope = this.configService.get('GOOGLE_OAUTH_SCOPE');
  }

  getAuthorizationUrl(clientRedirectUrl: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      response_type: 'code',
      scope: this.scope,
      state: clientRedirectUrl,
    } satisfies GoogleAuthorizationParams);

    return `${this.url.authorization}?${params.toString()}`;
  }

  async signIn(code: string, state: string): Promise<OAuthSignInResult> {
    const getAccessTokenResponse = await this.httpService.post<GoogleGetAccessTokenResponse, GoogleGetAccessTokenBody>(
      this.url.token,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUrl,
      }
    );

    const googleUserInfo = await this.httpService.get<GoogleUserInfoResponse>(this.url.userInfo, {
      headers: {
        Authorization: `Bearer ${getAccessTokenResponse.data.access_token}`,
      },
    });

    const member = await this.memberAuthService.findOrCreateMember(
      OAUTH_PROVIDER.GOOGLE,
      googleUserInfo.data.sub,
      googleUserInfo.data.email
    );

    const { accessToken, refreshToken } = this.jwtService.createJwt({ id: member.id, role: member.role });
    return { accessToken, refreshToken, redirectUrl: state };
  }
}
