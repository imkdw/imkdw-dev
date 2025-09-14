import { ARTICLE_COMMENT_EXCEPTION_CODES } from '@imkdw-dev/exception';
import { CustomException } from '@/common/exception/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class ArticleCommentNotFoundException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: ARTICLE_COMMENT_EXCEPTION_CODES.ARTICLE_COMMENT_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
