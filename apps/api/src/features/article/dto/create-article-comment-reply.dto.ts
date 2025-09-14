import { IsNotEmptyString } from '@/common/decorator/is-not-empty-string.decorator';
import { ICreateArticleCommentReplyDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleCommentReplyDto implements ICreateArticleCommentReplyDto {
  @ApiProperty({ description: '답글 내용', example: '답글 내용입니다' })
  @IsNotEmptyString()
  content: string;
}
