import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { MyConfigModule } from '@/config/my-config.module';
import { AuthModule } from '@/auth/auth.module';
import { RepositoryModule } from '@/shared/repository/repository.module';
import { ValidatorModule } from '@/shared/validator/validator.module';
import { ArticleModule } from '@/features/article/article.module';
import { SeriesModule } from '@/features/series/series.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { CookieToAuthMiddleware } from '@/common/middleware/cookie-to-auth.middleware';
import { MemberRoleGuard } from '@/common/guards/member-role.guard';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';

@Module({
  imports: [MyConfigModule, AuthModule, RepositoryModule, ValidatorModule, ArticleModule, SeriesModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MemberRoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieToAuthMiddleware).forRoutes('*');
  }
}
