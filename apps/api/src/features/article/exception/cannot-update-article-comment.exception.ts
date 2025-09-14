import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { CustomException } from '@/common/exception/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class CannotUpdateArticleCommentException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.CANNOT_UPDATE_ARTICLE_COMMENT,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
