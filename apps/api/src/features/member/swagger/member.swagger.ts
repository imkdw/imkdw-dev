import { MemberDto } from '@/features/member/dto/member.dto';
import { ResponseGetMemberStatsDto } from '@/features/member/dto/member-stats.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export function getCurrentMember(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: MemberDto }));
}

export function findMember(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: MemberDto }));
}

export function getMemberStats(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetMemberStatsDto }));
}
