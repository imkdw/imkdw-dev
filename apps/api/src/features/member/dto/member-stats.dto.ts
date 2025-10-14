import { ApiProperty } from '@nestjs/swagger';
import { IMemberStatsDto } from '@imkdw-dev/types';

export class ResponseGetMemberStatsDto implements IMemberStatsDto {
  @ApiProperty({ description: '작성한 댓글 개수', example: 42 })
  commentCount: number;
}
