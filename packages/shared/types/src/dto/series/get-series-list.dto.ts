import { IOffsetPagingListDto, IRequestOffsetPagingDto } from '../common/pagination.dto';
import { ISeriesTagDto } from './series-tag.dto';

export type IRequestGetSeriesListDto = IRequestOffsetPagingDto;

export interface ISeriesListItemDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  articleCount: number;
  totalReadMinute: number;
  lastArticleCreatedAt: Date | string | null;
  createdAt: Date;
  tags: ISeriesTagDto[];
}

export type IResponseGetSeriesListDto = IOffsetPagingListDto<ISeriesListItemDto>;
