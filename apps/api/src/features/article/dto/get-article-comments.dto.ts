import { ApiProperty } from '@nestjs/swagger';
import { IArticleCommentAuthorDto, IArticleCommentDto, IResponseGetArticleCommentsDto } from '@imkdw-dev/types';

export class ArticleCommentAuthorDto implements IArticleCommentAuthorDto {
  @ApiProperty({ description: '작성자 닉네임', example: 'imkdw' })
  nickname: string;

  @ApiProperty({ description: '작성자 프로필 이미지 URL', example: 'https://example.com/profile.jpg' })
  profileImage: string;
}

export class ArticleCommentDto implements IArticleCommentDto {
  @ApiProperty({ description: '댓글 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: '댓글 내용', example: '좋은 글 감사합니다!' })
  content: string;

  @ApiProperty({ description: '댓글 작성일', example: '2024-01-15T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: ArticleCommentAuthorDto, description: '작성자 정보' })
  author: ArticleCommentAuthorDto;
}

export class ResponseGetArticleCommentsDto implements IResponseGetArticleCommentsDto {
  @ApiProperty({ type: [ArticleCommentDto], description: '댓글 목록' })
  comments: ArticleCommentDto[];
}
