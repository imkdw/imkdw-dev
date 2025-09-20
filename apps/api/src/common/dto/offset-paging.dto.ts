import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { IRequestOffsetPagingDto, IResponseOffsetPagingDto } from '@imkdw-dev/types';

export class RequestOffsetPagingDto implements IRequestOffsetPagingDto {
  @ApiProperty({ description: '받아올 데이터의 개수', example: 5, minimum: 0, maximum: 100 })
  @Min(0)
  @Max(100)
  @IsInt()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: '현재 페이지', example: 2 })
  @IsInt()
  @Type(() => Number)
  page: number;
}

export class ResponseOffsetPagingDto implements IResponseOffsetPagingDto {
  @ApiProperty({ description: '이전 페이지 존재 여부', example: true })
  havePrev: boolean;

  @ApiProperty({ description: '다음 페이지 존재 여부', example: true })
  haveNext: boolean;

  @ApiProperty({ description: '총 아이템의 개수', example: 100 })
  totalCount: number;

  @ApiProperty({ description: '총 페이지의 개수', example: 10 })
  totalPage: number;
}
