import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';

const { ROOT } = API_ENDPOINTS;

@ApiTags('기타')
@Controller()
export class AppController {
  @Public()
  @Get(ROOT)
  getHello(): string {
    return 'Hello';
  }
}
