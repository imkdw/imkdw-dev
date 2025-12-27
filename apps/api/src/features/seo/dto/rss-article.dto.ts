import { ApiProperty } from '@nestjs/swagger';
import { IRssArticleDto } from '@imkdw-dev/types';

export class RssArticleDto implements IRssArticleDto {
  @ApiProperty({ description: '게시글 제목', example: 'Node.js 이벤트 루프 이해하기' })
  title: string;

  @ApiProperty({ description: '게시글 슬러그', example: 'nodejs-event-loop' })
  slug: string;

  @ApiProperty({ description: '게시글 본문 내용 (HTML 태그 제거)', example: 'Node.js의 이벤트 루프는...' })
  plainContent: string;

  @ApiProperty({ description: '게시글 생성 일시', example: '2024-01-15T00:00:00.000Z' })
  createdAt: Date | string;

  @ApiProperty({ description: '시리즈 제목', example: 'Node.js 완벽 가이드' })
  seriesTitle: string;

  @ApiProperty({ description: '태그 이름 목록', example: ['JavaScript', 'Node.js'] })
  tagNames: string[];
}
