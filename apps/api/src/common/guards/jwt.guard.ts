import { JwtService } from '@/auth/service/jwt.service';
import { IS_PUBLIC_KEY } from '@/common/decorator/public.decorator';
import { CustomException } from '@/common/exception/custom.exception';
import { MemberValidator } from '@/shared/validator/member.validator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

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

    const authorization: string | undefined = request.headers['authorization'];

    if (!authorization) {
      return false;
    }

    const splittedAccessToken = authorization.split(' ');
    if (splittedAccessToken.length !== 2) {
      return false;
    }

    const parsedAccessToken = splittedAccessToken[1];
    if (!parsedAccessToken) {
      return false;
    }

    try {
      const { id, role } = this.jwtService.verifyJwt(parsedAccessToken);

      if (!id) {
        return false;
      }

      await this.memberValidator.checkExist(id);

      request.requester = { ...request.requester, id, role };

      return true;
    } catch (error) {
      if (error instanceof CustomException) {
        throw error;
      }

      return false;
    }
  }
}
