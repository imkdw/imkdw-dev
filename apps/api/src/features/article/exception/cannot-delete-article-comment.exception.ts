import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { CustomException } from '@/common/exception/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class CannotDeleteArticleCommentException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.CANNOT_DELETE_ARTICLE_COMMENT,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
