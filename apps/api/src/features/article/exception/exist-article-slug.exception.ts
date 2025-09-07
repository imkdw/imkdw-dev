import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class ExistArticleSlugException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.EXIST_ARTICLE_SLUG,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
