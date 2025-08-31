import { IResponseGetOAuthUrlDto } from '@imkdw-dev/types';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetOAuthUrlDto implements IResponseGetOAuthUrlDto {
  @ApiProperty({
    description: 'OAuth 인증을 위한 콜백 URL',
    example: 'https://nid.naver.com/oauth2.0/authorize?client_id=...',
  })
  url: string;
}
