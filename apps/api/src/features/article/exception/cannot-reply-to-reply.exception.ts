import { CustomException } from '@/common/exception/custom.exception';
import { ARTICLE_COMMENT_EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class CannotReplyToReplyException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: ARTICLE_COMMENT_EXCEPTION_CODES.CANNOT_REPLY_TO_REPLY,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
