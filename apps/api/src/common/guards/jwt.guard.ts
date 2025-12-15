import { JwtService } from '@/auth/service/jwt.service';
import { IS_PUBLIC_KEY } from '@/common/decorator/public.decorator';
import { CustomException } from '@/common/exception/custom.exception';
import { MemberValidator } from '@/shared/validator/member.validator';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly memberValidator: MemberValidator
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const authorization: string = request.headers['authorization'] ?? '';

    const parsedAccessToken = authorization.split(' ')[1];
    if (!parsedAccessToken) {
      throw new UnauthorizedException();
    }

    try {
      const { id, role } = this.jwtService.verifyJwt(parsedAccessToken);

      if (!id) {
        return false;
      }

      await this.memberValidator.checkExist(id);

      const isAdmin = role === MEMBER_ROLE.ADMIN;
      request.requester = { id, role, isAdmin };

      return true;
    } catch (error) {
      if (error instanceof CustomException) {
        throw error;
      }

      return false;
    }
  }
}
