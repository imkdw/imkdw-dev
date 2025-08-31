import { CustomException } from '@/common/exception/custom.exception';
import { EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class NotSupportedOAuthProviderException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.NOT_SUPPORTED_OAUTH_PROVIDER,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
