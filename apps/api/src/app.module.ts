import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MyConfigModule } from '@/config/my-config.module';
import { AuthModule } from '@/auth/auth.module';
import { RepositoryModule } from '@/shared/repository/repository.module';
import { ValidatorModule } from '@/shared/validator/validator.module';
import { ArticleModule } from '@/features/article/article.module';
import { SeriesModule } from '@/features/series/series.module';

@Module({
  imports: [MyConfigModule, AuthModule, RepositoryModule, ValidatorModule, ArticleModule, SeriesModule],
  controllers: [AppController],
})
export class AppModule {}
