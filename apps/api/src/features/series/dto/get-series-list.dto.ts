import { ApiProperty } from '@nestjs/swagger';
import { ISeriesListItemDto, IRequestGetSeriesListDto, IResponseGetSeriesListDto } from '@imkdw-dev/types';
import { RequestOffsetPagingDto, ResponseOffsetPagingDto } from '@/common/dto/offset-paging.dto';

export class SeriesListItemDto implements ISeriesListItemDto {
  private constructor(id: string, title: string, slug: string, description: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.createdAt = createdAt;
  }

  @ApiProperty({ description: '시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 뜯어보기' })
  readonly title: string;

  @ApiProperty({ description: '시리즈 슬러그', example: 'nodejs-deep-dive' })
  readonly slug: string;

  @ApiProperty({ description: '시리즈 설명', example: 'Node.js의 내부 동작 원리를 상세히 알아보는 시리즈' })
  readonly description: string;

  @ApiProperty({ description: '생성 일시', example: '2024-01-01T00:00:00.000Z' })
  readonly createdAt: Date;
}

export class GetSeriesListDto extends RequestOffsetPagingDto implements IRequestGetSeriesListDto {}

export class ResponseGetSeriesListDto extends ResponseOffsetPagingDto implements IResponseGetSeriesListDto {
  @ApiProperty({ type: [SeriesListItemDto], description: '시리즈 목록' })
  items: SeriesListItemDto[];
}
