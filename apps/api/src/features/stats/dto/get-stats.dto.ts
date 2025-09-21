import { ApiProperty } from '@nestjs/swagger';
import { IGetStatsResponseDto } from '@imkdw-dev/types';
import { GetStatsResult } from '@/features/stats/types/stats.type';

class ArticleStatsDto {
  @ApiProperty({ description: '총 게시글 개수', example: 150 })
  readonly count: number;

  @ApiProperty({ description: '총 게시글 조회수', example: 12450 })
  readonly viewCount: number;

  constructor(count: number, viewCount: number) {
    this.count = count;
    this.viewCount = viewCount;
  }
}

class SeriesStatsDto {
  @ApiProperty({ description: '총 시리즈 개수', example: 25 })
  readonly count: number;

  constructor(count: number) {
    this.count = count;
  }
}

class TagStatsDto {
  @ApiProperty({ description: '총 태그 개수', example: 80 })
  readonly count: number;

  constructor(count: number) {
    this.count = count;
  }
}

export class ResponseGetStatsDto implements IGetStatsResponseDto {
  @ApiProperty({ type: ArticleStatsDto, description: '게시글 통계' })
  readonly article: ArticleStatsDto;

  @ApiProperty({ type: SeriesStatsDto, description: '시리즈 통계' })
  readonly series: SeriesStatsDto;

  @ApiProperty({ type: TagStatsDto, description: '태그 통계' })
  readonly tag: TagStatsDto;

  private constructor(article: ArticleStatsDto, series: SeriesStatsDto, tag: TagStatsDto) {
    this.article = article;
    this.series = series;
    this.tag = tag;
  }

  static from(result: GetStatsResult): ResponseGetStatsDto {
    const article = new ArticleStatsDto(result.article.count, result.article.viewCount);
    const series = new SeriesStatsDto(result.series.count);
    const tag = new TagStatsDto(result.tag.count);

    return new ResponseGetStatsDto(article, series, tag);
  }
}
