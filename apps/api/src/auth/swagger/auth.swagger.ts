import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function refreshToken(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiHeader({ name: 'Cookie', description: '쿠키 내부에 있는 리프레쉬 토큰', example: 'refreshToken=1234567890' }),
    ApiNoContentResponse({
      description: '토큰 갱신 성공',
      headers: {
        'Set-Cookie': {
          description: '액세스 토큰',
          schema: {
            type: 'string',
          },
        },
      },
    })
  );
}
