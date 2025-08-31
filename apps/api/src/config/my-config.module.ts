import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfigService } from './my-config.service';

import { myConfig } from '@/config/my-config.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: config => myConfig.parse(config),
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
