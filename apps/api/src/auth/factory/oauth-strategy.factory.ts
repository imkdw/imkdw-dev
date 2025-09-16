import { NotSupportedOAuthProviderException } from '@/auth/exception/not-supported-oauth-provider.exception';
import { GithubOAuthStrategy } from '@/auth/strategy/github.strategy';
import { GoogleOAuthStrategy } from '@/auth/strategy/google.strategy';
import { OAuthStrategy } from '@/auth/strategy/oauth.strategy';
import { OAUTH_PROVIDER, OAuthProvider } from '@imkdw-dev/consts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthStrategyFactory {
  constructor(
    private readonly googleStrategy: GoogleOAuthStrategy,
    private readonly githubStrategy: GithubOAuthStrategy
  ) {}

  getStrategy(provider: OAuthProvider): OAuthStrategy {
    switch (provider) {
      case OAUTH_PROVIDER.GOOGLE:
        return this.googleStrategy;
      case OAUTH_PROVIDER.GITHUB:
        return this.githubStrategy;
      default:
        throw new NotSupportedOAuthProviderException(`${provider}는 지원하지 않는 소셜 로그인 방법입니다`);
    }
  }
}
