import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { ARTICLE_MAX_CONTENT_LENGTH, ARTICLE_MAX_TAGS, ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';
import { IUpdateArticleDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateArticleDto implements IUpdateArticleDto {
  @ApiProperty({ description: '제목', example: '게시글 제목입니다', maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ApiProperty({ description: '내용', example: '게시글 내용입니다', maxLength: ARTICLE_MAX_CONTENT_LENGTH })
  @MaxLength(ARTICLE_MAX_CONTENT_LENGTH)
  @IsNotEmptyString()
  readonly content: string;

  @ApiProperty({ description: '시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmptyString()
  readonly seriesId: string;

  @ApiProperty({
    description: '태그 목록',
    example: ['JavaScript', 'React', 'TypeScript', 'NestJS'],
    maxItems: ARTICLE_MAX_TAGS,
  })
  @ArrayMaxSize(ARTICLE_MAX_TAGS)
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
