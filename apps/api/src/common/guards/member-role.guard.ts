import { MEMBER_ROLES_KEY } from '@/common/decorator/member-role.decorator';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class MemberRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(MEMBER_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    if (!request.requester) {
      return false;
    }

    const { requester } = request;

    if (requester.role === MEMBER_ROLE.ADMIN) {
      return true;
    }

    return requiredRoles.some(role => requester.role === role);
  }
}
