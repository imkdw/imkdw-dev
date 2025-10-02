import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TagDto } from '@/features/tag/dto/get-tag-list.dto';

export function getTagList(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ type: [TagDto], description: '태그 목록이 성공적으로 조회되었습니다' })
  );
}
