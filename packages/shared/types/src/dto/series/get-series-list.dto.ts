import { IOffsetPagingListDto, IRequestOffsetPagingDto } from '../common/pagination.dto';

export interface IRequestGetSeriesListDto extends IRequestOffsetPagingDto {}

export interface ISeriesListItemDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
}

export interface IResponseGetSeriesListDto extends IOffsetPagingListDto<ISeriesListItemDto> {}
