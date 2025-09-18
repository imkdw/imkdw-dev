import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { Request } from 'express';

@Injectable()
export class MemberAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.requester) {
      throw new ForbiddenException();
    }

    const { requester } = request;
    const { memberId } = request.params;

    if (requester.role === MEMBER_ROLE.ADMIN) {
      return true;
    }

    if (requester.id === memberId) {
      return true;
    }

    throw new ForbiddenException();
  }
}
