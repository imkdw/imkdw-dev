import { MemberDto } from '@/features/member/dto/member.dto';
import { ResponseGetMemberStatsDto } from '@/features/member/dto/member-stats.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNoContentResponse, ApiBody } from '@nestjs/swagger';
import { UpdateMemberDto } from '@/features/member/dto/update-member.dto';

export function getCurrentMember(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: MemberDto }));
}

export function findMember(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: MemberDto }));
}

export function getMemberStats(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetMemberStatsDto }));
}

export function updateMember(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateMemberDto }),
    ApiNoContentResponse({ description: '사용자 정보가 성공적으로 수정되었습니다' })
  );
}
