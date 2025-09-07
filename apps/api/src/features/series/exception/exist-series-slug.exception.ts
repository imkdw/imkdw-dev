import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class ExistSeriesSlugException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.EXIST_SERIES_SLUG,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
