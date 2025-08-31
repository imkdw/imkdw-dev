import { Module } from '@nestjs/common';

import { MyConfigModule } from '@/config/my-config.module';
import { CookieService } from '@/infra/cookie/service/cookie.service';

@Module({
  imports: [MyConfigModule],
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}
