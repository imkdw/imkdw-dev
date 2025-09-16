import { MemberDto } from '@/features/member/dto/member.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export function getCurrentMember(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: MemberDto }));
}
