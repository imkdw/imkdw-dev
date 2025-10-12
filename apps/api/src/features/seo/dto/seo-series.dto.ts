import { ApiProperty } from '@nestjs/swagger';
import { ISeoSeriesDto } from '@imkdw-dev/types';

export class SeoSeriesDto implements ISeoSeriesDto {
  @ApiProperty({ description: '시리즈 슬러그', example: 'nodejs-deep-dive' })
  slug: string;

  @ApiProperty({ description: '업데이트 일시', example: '2024-01-15T00:00:00.000Z' })
  updatedAt: Date;
}
