import { IRequestOffsetPagingDto, IResponseOffsetPagingDto } from '../common';

export interface IArticleSeriesDto {
  id: string;
  title: string;
  slug: string;
}

export interface IArticleListItemDto {
  id: string;
  title: string;
  slug: string;
  viewCount: number;
  readMinute: number;
  createdAt: Date;
  series: IArticleSeriesDto;
}

export interface IRequestGetArticlesDto extends IRequestOffsetPagingDto {
  seriesId?: string;
}

export interface IResponseGetArticlesDto extends IResponseOffsetPagingDto {
  items: IArticleListItemDto[];
}
