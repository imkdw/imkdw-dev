import { ApiProperty } from '@nestjs/swagger';
import { ITagDto } from '@imkdw-dev/types';

export class TagDto implements ITagDto {
  @ApiProperty({ description: '태그 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: '태그 이름', example: 'TypeScript' })
  readonly name: string;
}
