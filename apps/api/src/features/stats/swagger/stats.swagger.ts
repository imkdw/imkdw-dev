import { ResponseGetStatsDto } from '@/features/stats/dto/get-stats.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function getStats(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ type: ResponseGetStatsDto, description: '통계 정보 조회 성공' })
  );
}