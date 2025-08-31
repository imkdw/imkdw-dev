import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function getOAuthUrl(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}
