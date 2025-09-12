import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { SERIES_MAX_TITLE_LENGTH, SERIES_MAX_DESCRIPTION_LENGTH } from '@imkdw-dev/consts';
import { IUpdateSeriesDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UpdateSeriesDto implements IUpdateSeriesDto {
  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 뜯어보기 (수정)', maxLength: SERIES_MAX_TITLE_LENGTH })
  @MaxLength(SERIES_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ApiProperty({
    description: '시리즈 설명',
    example: '수정된 Node.js의 내부 동작 원리를 알아보는 시리즈',
    maxLength: SERIES_MAX_DESCRIPTION_LENGTH,
  })
  @MaxLength(SERIES_MAX_DESCRIPTION_LENGTH)
  @IsNotEmptyString()
  readonly description: string;
}
