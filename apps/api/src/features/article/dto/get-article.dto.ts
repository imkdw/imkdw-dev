import { ApiProperty } from '@nestjs/swagger';
import {
  IArticleDto,
  IArticleNavigationDto,
  IArticleSeriesDto,
  IArticleTagDto,
  IResponseGetArticleDto,
} from '@imkdw-dev/types';
import { ArticleSeriesDto, ArticleTagDto } from '@/features/article/dto/get-articles.dto';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

export class ArticleDto implements IArticleDto {
  @ApiProperty({ description: '게시글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: '게시글 제목', example: 'Node.js 이벤트 루프 이해하기' })
  title: string;

  @ApiProperty({ description: '게시글 슬러그', example: 'understanding-nodejs-event-loop' })
  slug: string;

  @ApiProperty({
    description: '게시글 전체 내용',
    example: 'Node.js의 이벤트 루프는 비동기 작업을 처리하는 핵심 메커니즘입니다...',
  })
  content: string;

  @ApiProperty({
    description: '게시글 내용 (HTML 태그 제거, 200자 제한)',
    example: 'Node.js의 이벤트 루프는 비동기 작업을 처리하는 핵심 메커니즘입니다...',
  })
  plainContent: string;

  @ApiProperty({ description: '조회수', example: 1250 })
  viewCount: number;

  @ApiProperty({ description: '읽기 시간(분)', example: 7 })
  readMinute: number;

  @ApiProperty({ description: '생성 일시', example: '2024-01-15T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '게시글 상태', enum: Object.values(ARTICLE_STATE) })
  state: string;

  @ApiProperty({ type: ArticleSeriesDto, description: '시리즈 정보' })
  series: IArticleSeriesDto;

  @ApiProperty({ type: [ArticleTagDto], description: '태그 목록' })
  tags: IArticleTagDto[];
}

export class ArticleNavigationDto implements IArticleNavigationDto {
  @ApiProperty({ description: '게시글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: '게시글 제목', example: 'Node.js 이벤트 루프 이해하기' })
  title: string;

  @ApiProperty({ description: '게시글 슬러그', example: 'understanding-nodejs-event-loop' })
  slug: string;
}

export class ResponseGetArticleDto implements IResponseGetArticleDto {
  @ApiProperty({ type: ArticleDto, description: '게시글 상세 정보' })
  article: ArticleDto;

  @ApiProperty({ type: ArticleNavigationDto, nullable: true, description: '이전 게시글 정보' })
  prevArticle: ArticleNavigationDto | null;

  @ApiProperty({ type: ArticleNavigationDto, nullable: true, description: '다음 게시글 정보' })
  nextArticle: ArticleNavigationDto | null;
}
