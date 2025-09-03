import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MyConfigModule } from '@/config/my-config.module';
import { AuthModule } from '@/auth/auth.module';
import { RepositoryModule } from '@/shared/repository/repository.module';
import { BlogModule } from '@/features/blog/blog.module';

@Module({
  imports: [MyConfigModule, AuthModule, RepositoryModule, BlogModule],
  controllers: [AppController],
})
export class AppModule {}
