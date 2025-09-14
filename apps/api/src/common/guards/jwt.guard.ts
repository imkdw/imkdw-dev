import { JwtService } from '@/auth/service/jwt.service';
import { IS_PUBLIC_KEY } from '@/common/decorator/public.decorator';
import { PrismaService } from '@/infra/database/prisma.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
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

    const accessToken: string | undefined = request.headers['authorization'];
    if (!accessToken) {
      return false;
    }

    try {
      const { id, role } = this.jwtService.verifyJwt(accessToken);
      if (!id) {
        return false;
      }

      request.requester = { ...request.requester, id, role };

      return true;
    } catch {
      return false;
    }
  }
}
