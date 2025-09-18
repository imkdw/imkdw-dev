import { OAUTH_URL } from '@/auth/consts/oauth.const';
import { JwtService } from '@/auth/service/jwt.service';
import { MemberAuthService } from '@/auth/service/member-auth.service';
import { OAuthStrategy } from '@/auth/strategy/oauth.strategy';
import {
  GithubAuthorizationParams,
  GithubGetAccessTokenBody,
  GithubGetAccessTokenResponse,
  GithubUserInfoResponse,
} from '@/auth/types/github-oauth.type';
import { OAuthSignInResult } from '@/auth/types/oauth.type';
import { MyConfigService } from '@/config/my-config.service';
import { HTTP_SERVICE } from '@/infra/http/http.const';
import { HttpService } from '@/infra/http/http.service';
import { OAUTH_PROVIDER } from '@imkdw-dev/consts';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GithubOAuthStrategy implements OAuthStrategy {
  private readonly url = OAUTH_URL['github'];
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly scope: string;

  constructor(
    @Inject(HTTP_SERVICE) private readonly httpService: HttpService,
    private readonly configService: MyConfigService,
    private readonly memberAuthService: MemberAuthService,
    private readonly jwtService: JwtService
  ) {
    this.clientId = this.configService.get('GITHUB_CLIENT_ID');
    this.clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
    this.redirectUrl = this.configService.get('GITHUB_REDIRECT_URL');
    this.scope = this.configService.get('GITHUB_OAUTH_SCOPE');
  }

  getAuthorizationUrl(clientRedirectUrl: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      scope: this.scope,
      state: clientRedirectUrl,
    } satisfies GithubAuthorizationParams);

    return `${this.url.authorization}?${params.toString()}`;
  }

  async signIn(code: string, state: string): Promise<OAuthSignInResult> {
    const getAccessTokenResponse = await this.httpService.post<GithubGetAccessTokenResponse, GithubGetAccessTokenBody>(
      this.url.token,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      } satisfies GithubGetAccessTokenBody,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const githubUserInfo = await this.httpService.get<GithubUserInfoResponse>(this.url.userInfo, {
      headers: {
        Authorization: `Bearer ${getAccessTokenResponse.data.access_token}`,
      },
    });

    const member = await this.memberAuthService.findOrCreateMember(
      OAUTH_PROVIDER.GITHUB,
      githubUserInfo.data.id.toString(),
      githubUserInfo.data.email,
      githubUserInfo.data.avatar_url
    );

    const { accessToken, refreshToken } = this.jwtService.createJwt({ id: member.id, role: member.role });
    return { accessToken, refreshToken, redirectUrl: state };
  }
}
