import { HTTP_SERVICE } from '@/infra/http/const/http.const';
import { FetchHttpService } from '@/infra/http/service/fetch-http.service';
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
