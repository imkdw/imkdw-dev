import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfigService } from './my-config.service';

import { myConfig } from '@/config/my-config.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: config => myConfig.parse(config),
      ignoreEnvFile: true,
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class MyConfigModule {}
