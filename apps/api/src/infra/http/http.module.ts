import { HTTP_SERVICE } from '@/infra/http/http.const';
import { FetchHttpService } from '@/infra/http/fetch-http.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: HTTP_SERVICE,
      useClass: FetchHttpService,
    },
  ],
  exports: [HTTP_SERVICE],
})
export class HttpModule {}
