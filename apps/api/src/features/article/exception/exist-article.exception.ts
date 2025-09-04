import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class ExistArticleException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.EXIST_ARTICLE_TITLE,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
