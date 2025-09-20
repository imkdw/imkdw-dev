import { IOffsetPagingListDto, IRequestOffsetPagingDto } from '../common/pagination.dto';

export interface IGetSeriesListDto extends IRequestOffsetPagingDto {}

export interface ISeriesListItemDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
}

export interface IGetSeriesListResponseDto extends IOffsetPagingListDto<ISeriesListItemDto> {}
