import { AuthController } from '@/auth/controller/auth.controller';
import { OAuthController } from '@/auth/controller/oauth.controller';
import { OAuthStrategyFactory } from '@/auth/factory/oauth-strategy.factory';
import { JwtService } from '@/auth/service/jwt.service';
import { MemberAuthService } from '@/auth/service/member-auth.service';
import { GithubOAuthStrategy } from '@/auth/strategy/github.strategy';
import { GoogleOAuthStrategy } from '@/auth/strategy/google.strategy';
import { RefreshTokenUseCase } from '@/auth/use-case/refresh-token.use-case';
import { MyConfigModule } from '@/config/my-config.module';
import { CookieModule } from '@/infra/cookie/cookie.module';
import { HttpModule } from '@/infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CookieModule, HttpModule, MyConfigModule],
  controllers: [OAuthController, AuthController],
  providers: [
    OAuthStrategyFactory,
    GoogleOAuthStrategy,
    MemberAuthService,
    JwtService,
    GithubOAuthStrategy,
    RefreshTokenUseCase,
  ],
  exports: [JwtService],
})
export class AuthModule {}
