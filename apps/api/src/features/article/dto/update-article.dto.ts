import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { ARTICLE_MAX_CONTENT_LENGTH, ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';
import { IUpdateArticleDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class UpdateArticleDto implements IUpdateArticleDto {
  @ApiProperty({ description: '제목', example: '게시글 제목입니다', maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ApiProperty({ description: '내용', example: '게시글 내용입니다', maxLength: ARTICLE_MAX_CONTENT_LENGTH })
  @MaxLength(ARTICLE_MAX_CONTENT_LENGTH)
  @IsNotEmptyString()
  readonly content: string;
}
