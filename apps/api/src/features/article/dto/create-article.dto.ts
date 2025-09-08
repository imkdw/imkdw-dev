import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { ARTICLE_MAX_CONTENT_LENGTH, ARTICLE_MAX_SLUG_LENGTH, ARTICLE_MAX_TITLE_LENGTH } from '@imkdw-dev/consts';
import { ICreateArticleDto, IResponseCreateArticleDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { Article } from '@/shared/domain/article/article';

export class CreateArticleDto implements ICreateArticleDto {
  @ApiProperty({ description: '제목', example: '게시글 제목입니다', maxLength: ARTICLE_MAX_TITLE_LENGTH })
  @MaxLength(ARTICLE_MAX_TITLE_LENGTH)
  @IsNotEmptyString()
  readonly title: string;

  @ApiProperty({
    description: '게시글 슬러그 (URL 경로)',
    example: 'my-awesome-article',
    maxLength: ARTICLE_MAX_SLUG_LENGTH,
  })
  @MaxLength(ARTICLE_MAX_SLUG_LENGTH)
  @IsNotEmptyString()
  readonly slug: string;

  @ApiProperty({ description: '내용', example: '게시글 내용입니다', maxLength: ARTICLE_MAX_CONTENT_LENGTH })
  @MaxLength(ARTICLE_MAX_CONTENT_LENGTH)
  @IsNotEmptyString()
  readonly content: string;

  @ApiProperty({ description: '시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmptyString()
  readonly seriesId: string;
}

export class ResponseCreateArticleDto implements IResponseCreateArticleDto {
  private constructor(id: string, slug: string) {
    this.id = id;
    this.slug = slug;
  }

  @ApiProperty({ description: '생성된 게시글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: '게시글 슬러그', example: 'my-awesome-article' })
  readonly slug: string;

  static from(article: Article): ResponseCreateArticleDto {
    return new ResponseCreateArticleDto(article.id, article.slug);
  }
}
