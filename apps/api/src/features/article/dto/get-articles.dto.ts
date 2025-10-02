import { ApiProperty } from '@nestjs/swagger';
import {
  IArticleListItemDto,
  IArticleSeriesDto,
  IArticleTagDto,
  IRequestGetArticlesDto,
  IResponseGetArticlesDto,
} from '@imkdw-dev/types';
import { RequestOffsetPagingDto, ResponseOffsetPagingDto } from '@/common/dto/offset-paging.dto';
import { IsOptional } from 'class-validator';
import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';

export class ArticleSeriesDto implements IArticleSeriesDto {
  @ApiProperty({ description: '시리즈 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 뜯어보기' })
  title: string;

  @ApiProperty({ description: '시리즈 슬러그', example: 'nodejs-deep-dive' })
  slug: string;
}

export class ArticleTagDto implements IArticleTagDto {
  @ApiProperty({ description: '태그 ID', example: 'nodejs' })
  id: string;

  @ApiProperty({ description: '태그 이름', example: 'Node.js' })
  name: string;
}

export class ArticleListItemDto implements IArticleListItemDto {
  @ApiProperty({ description: '게시글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: '게시글 제목', example: 'Node.js 이벤트 루프 이해하기' })
  title: string;

  @ApiProperty({ description: '게시글 슬러그', example: 'understanding-nodejs-event-loop' })
  slug: string;

  @ApiProperty({
    description: '게시글 내용 (200자 제한)',
    example: 'Node.js의 이벤트 루프는 비동기 작업을 처리하는 핵심 메커니즘입니다...',
  })
  content: string;

  @ApiProperty({ description: '조회수', example: 1250 })
  viewCount: number;

  @ApiProperty({ description: '읽기 시간(분)', example: 7 })
  readMinute: number;

  @ApiProperty({ description: '생성 일시', example: '2024-01-15T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: ArticleSeriesDto, description: '시리즈 정보' })
  series: ArticleSeriesDto;

  @ApiProperty({ type: [ArticleTagDto], description: '태그 목록' })
  tags: ArticleTagDto[];
}

export class RequestGetArticlesDto extends RequestOffsetPagingDto implements IRequestGetArticlesDto {
  @ApiProperty({ description: '시리즈 아이디', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmptyString()
  @IsOptional()
  seriesId?: string;
}

export class ResponseGetArticlesDto extends ResponseOffsetPagingDto implements IResponseGetArticlesDto {
  @ApiProperty({ type: [ArticleListItemDto], description: '게시글 목록' })
  items: ArticleListItemDto[];
}
