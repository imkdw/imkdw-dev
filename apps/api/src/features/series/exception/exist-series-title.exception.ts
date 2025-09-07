import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class ExistSeriesTitleException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.EXIST_SERIES_TITLE,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}