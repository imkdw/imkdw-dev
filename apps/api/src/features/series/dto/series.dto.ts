import { ISeriesDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { Series } from '@/shared/domain/series/series';

export class SeriesDto implements ISeriesDto {
  private constructor(id: string, title: string, slug: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.createdAt = createdAt;
  }

  @ApiProperty({ description: '시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 뜯어보기' })
  readonly title: string;

  @ApiProperty({ description: '시리즈 슬러그', example: 'nodejs-deep-dive' })
  readonly slug: string;

  @ApiProperty({ description: '생성 일시', example: '2024-01-01T00:00:00.000Z' })
  readonly createdAt: Date;

  static from(series: Series): SeriesDto {
    return new SeriesDto(series.id, series.title, series.slug, series.createdAt);
  }
}
