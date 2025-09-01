import { OAuthController } from '@/auth/controller/oauth.controller';
import { OAuthStrategyFactory } from '@/auth/factory/oauth-strategy.factory';
import { JwtService } from '@/auth/service/jwt.service';
import { MemberAuthService } from '@/auth/service/member-auth.service';
import { GoogleOAuthStrategy } from '@/auth/strategy/google.strategy';
import { MyConfigModule } from '@/config/my-config.module';
import { CookieModule } from '@/infra/cookie/cookie.module';
import { HttpModule } from '@/infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CookieModule, HttpModule, MyConfigModule],
  controllers: [OAuthController],
  providers: [OAuthStrategyFactory, GoogleOAuthStrategy, MemberAuthService, JwtService],
})
export class AuthModule {}
