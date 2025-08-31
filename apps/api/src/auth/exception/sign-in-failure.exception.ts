import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class SignInFailureException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.AUTHORIZATION_FAILED,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
