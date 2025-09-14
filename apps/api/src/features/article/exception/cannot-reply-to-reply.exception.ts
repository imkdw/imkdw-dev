import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class CannotReplyToReplyException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.CANNOT_REPLY_TO_REPLY,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
