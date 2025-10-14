import { CustomException } from '@/common/exception/custom.exception';
import { MEMBER_EXCEPTION_CODES } from '@imkdw-dev/exception';
import { HttpStatus } from '@nestjs/common';

export class ExistMemberNicknameException extends CustomException {
  constructor(message: string) {
    super({
      errorCode: MEMBER_EXCEPTION_CODES.EXIST_MEMBER_NICKNAME,
      message,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
