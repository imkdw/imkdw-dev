import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ description: '제목', example: '게시글 제목입니다' })
  title: string;

  @ApiProperty({ description: '내용', example: '게시글 내용입니다' })
  content: string;
}
