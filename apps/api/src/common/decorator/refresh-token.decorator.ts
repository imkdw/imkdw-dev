import { parseFromCookie } from '@/common/function/cookie.function';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const RefreshToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const cookies = req.headers.cookie ?? '';
  const { refreshToken } = parseFromCookie(cookies, 'refreshToken');
  return refreshToken;
});
