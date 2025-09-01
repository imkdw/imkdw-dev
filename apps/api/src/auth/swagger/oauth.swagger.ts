import { ResponseGetOAuthUrlDto } from '@/auth/dto/get-oauth-url.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function getOAuthUrl(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetOAuthUrlDto }));
}
