import { CustomException } from '@/common/exception/custom.exception';
import { MEMBER_EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class MemberNotFoundException extends CustomException {
  constructor(message: string) {
    super({
      errorCode: MEMBER_EXCEPTION_CODES.MEMBER_NOT_FOUND,
      message,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
