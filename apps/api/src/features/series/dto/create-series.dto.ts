import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { SERIES_MAX_TITLE_LENGTH, SERIES_MAX_SLUG_LENGTH, SERIES_MAX_DESCRIPTION_LENGTH, ARTICLE_MAX_TAGS } from '@imkdw-dev/consts';
import { ICreateSeriesDto, IResponseCreateSeriesDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, MaxLength } from 'class-validator';
import { Series } from '@/shared/domain/series/series';

export class CreateSeriesDto implements ICreateSeriesDto {
  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 뜯어보기', maxLength: SERIES_MAX_TITLE_LENGTH })
  @MaxLength(SERIES_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ApiProperty({
    description: '시리즈 슬러그 (URL 경로)',
    example: 'nodejs-deep-dive',
    maxLength: SERIES_MAX_SLUG_LENGTH,
  })
  @MaxLength(SERIES_MAX_SLUG_LENGTH)
  @IsNotEmptyString()
  readonly slug: string;

  @ApiProperty({
    description: '시리즈 설명',
    example: 'Node.js의 내부 동작 원리를 상세히 알아보는 시리즈',
    maxLength: SERIES_MAX_DESCRIPTION_LENGTH,
  })
  @MaxLength(SERIES_MAX_DESCRIPTION_LENGTH)
  @IsNotEmptyString()
  readonly description: string;

  @ApiProperty({
    description: '시리즈 태그 목록 (최소 1개 이상)',
    example: ['JavaScript', 'Node.js', 'Backend', 'Tutorial'],
    maxItems: ARTICLE_MAX_TAGS,
  })
  @ArrayMaxSize(ARTICLE_MAX_TAGS)
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}

export class ResponseCreateSeriesDto implements IResponseCreateSeriesDto {
  private constructor(id: string, slug: string) {
    this.id = id;
    this.slug = slug;
  }

  @ApiProperty({ description: '생성된 시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: '시리즈 슬러그', example: 'nodejs-deep-dive' }) readonly slug: string;

  static from(series: Series): ResponseCreateSeriesDto {
    return new ResponseCreateSeriesDto(series.id, series.slug);
  }
}
