import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { CustomException } from '@/common/exception/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidJwtException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.INVALID_JWT,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
