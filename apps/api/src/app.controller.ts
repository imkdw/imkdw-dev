import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('기타')
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello';
  }
}
