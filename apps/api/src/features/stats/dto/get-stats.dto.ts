import { ApiProperty } from '@nestjs/swagger';
import { IArticleStatsDto, IResponseGetStatsDto, ISeriesStatsDto, ITagStatsDto } from '@imkdw-dev/types';

class ArticleStatsDto implements IArticleStatsDto {
  @ApiProperty({ description: '총 게시글 개수', example: 150 })
  readonly count: number;

  @ApiProperty({ description: '총 게시글 조회수', example: 12450 })
  readonly viewCount: number;
}

class SeriesStatsDto implements ISeriesStatsDto {
  @ApiProperty({ description: '총 시리즈 개수', example: 25 })
  readonly count: number;
}

class TagStatsDto implements ITagStatsDto {
  @ApiProperty({ description: '총 태그 개수', example: 80 })
  readonly count: number;
}

export class ResponseGetStatsDto implements IResponseGetStatsDto {
  @ApiProperty({ type: ArticleStatsDto, description: '게시글 통계' })
  readonly article: ArticleStatsDto;

  @ApiProperty({ type: SeriesStatsDto, description: '시리즈 통계' })
  readonly series: SeriesStatsDto;

  @ApiProperty({ type: TagStatsDto, description: '태그 통계' })
  readonly tag: TagStatsDto;
}
