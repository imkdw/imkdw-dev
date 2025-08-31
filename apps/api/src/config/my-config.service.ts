import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MyConfig } from './my-config.schema';

@Injectable()
export class MyConfigService {
  constructor(private readonly configService: ConfigService<MyConfig>) {}

  get<T extends keyof MyConfig>(key: T): MyConfig[T] {
    const value = this.configService.get(key);

    if (value === undefined) {
      throw new Error(`Configuration key "${String(key)}" is missing`);
    }

    return value;
  }
}
