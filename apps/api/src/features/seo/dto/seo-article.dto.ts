import { ApiProperty } from '@nestjs/swagger';
import { ISeoArticleDto } from '@imkdw-dev/types';

export class SeoArticleDto implements ISeoArticleDto {
  @ApiProperty({ description: '게시글 슬러그', example: 'nodejs-event-loop' })
  slug: string;

  @ApiProperty({ description: '업데이트 일시', example: '2024-01-15T00:00:00.000Z' })
  updatedAt: Date;
}
