import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { IUpdateArticleCommentDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleCommentDto implements IUpdateArticleCommentDto {
  @ApiProperty({ description: '댓글 내용', example: '댓글 내용입니다' })
  @IsNotEmptyString()
  content: string;
}
