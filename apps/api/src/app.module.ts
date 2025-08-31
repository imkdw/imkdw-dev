import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MyConfigModule } from '@/config/my-config.module';

@Module({
  imports: [MyConfigModule],
  controllers: [AppController],
})
export class AppModule {}
