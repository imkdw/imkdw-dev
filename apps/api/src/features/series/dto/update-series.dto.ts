import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { SERIES_MAX_TITLE_LENGTH, SERIES_MAX_SLUG_LENGTH } from '@imkdw-dev/consts';
import { IUpdateSeriesDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateSeriesDto implements IUpdateSeriesDto {
  @ApiProperty({
    description: '시리즈 제목',
    example: 'Node.js 뜯어보기 (수정)',
    maxLength: SERIES_MAX_TITLE_LENGTH,
    required: false,
  })
  @MaxLength(SERIES_MAX_TITLE_LENGTH)
  @IsOptional()
  @IsNotEmptyString()
  readonly title?: string;

  @ApiProperty({
    description: '시리즈 슬러그 (URL 경로)',
    example: 'nodejs-deep-dive-updated',
    maxLength: SERIES_MAX_SLUG_LENGTH,
    required: false,
  })
  @MaxLength(SERIES_MAX_SLUG_LENGTH)
  @IsOptional()
  @IsNotEmptyString()
  readonly slug?: string;
}
