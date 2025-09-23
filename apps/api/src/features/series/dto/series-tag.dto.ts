import { ApiProperty } from '@nestjs/swagger';
import { ISeriesTagDto } from '@imkdw-dev/types';

export class SeriesTagDto implements ISeriesTagDto {
  private constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @ApiProperty({ description: '태그 ID', example: '0E626A13-AE19-46AA-AFB9-D04EE7DF0F33' })
  readonly id: string;

  @ApiProperty({ description: '태그 이름', example: 'JavaScript' })
  readonly name: string;
}
