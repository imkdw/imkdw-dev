import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { MyConfigModule } from '@/config/my-config.module';
import { AuthModule } from '@/auth/auth.module';
import { RepositoryModule } from '@/shared/repository/repository.module';
import { ValidatorModule } from '@/shared/validator/validator.module';
import { ArticleModule } from '@/features/article/article.module';
import { SeriesModule } from '@/features/series/series.module';
import { MemberModule } from '@/features/member/member.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { CookieToAuthMiddleware } from '@/common/middleware/cookie-to-auth.middleware';
import { MemberRoleGuard } from '@/common/guards/member-role.guard';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { StatsModule } from '@/features/stats/stats.module';
import { TagModule } from '@/features/tag/tag.module';
import { StorageModule } from '@/infra/storage/storage.module';
import { CustomExceptionFilter } from '@/common/filter/custom-exception.filter';

@Module({
  imports: [
    MyConfigModule,
    AuthModule,
    RepositoryModule,
    ValidatorModule,
    ArticleModule,
    SeriesModule,
    MemberModule,
    StatsModule,
    TagModule,
    StorageModule,
  ],
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
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieToAuthMiddleware).forRoutes('*');
  }
}
