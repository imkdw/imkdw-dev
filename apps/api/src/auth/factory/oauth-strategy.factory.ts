import { NotSupportedOAuthProviderException } from '@/auth/exception/not-supported-oauth-provider.exception';
import { GoogleOAuthStrategy } from '@/auth/strategy/google.strategy';
import { OAuthStrategy } from '@/auth/strategy/oauth.strategy';
import { OAuthProvider } from '@imkdw-dev/consts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthStrategyFactory {
  constructor(private readonly googleStrategy: GoogleOAuthStrategy) {}

  getStrategy(provider: OAuthProvider): OAuthStrategy {
    switch (provider) {
      case 'google':
        return this.googleStrategy;
      default:
        throw new NotSupportedOAuthProviderException(`${provider}는 지원하지 않는 소셜 로그인 방법입니다`);
    }
  }
}
