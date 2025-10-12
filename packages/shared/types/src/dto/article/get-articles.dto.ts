import { IRequestOffsetPagingDto, IResponseOffsetPagingDto } from '../common';

export interface IArticleSeriesDto {
  id: string;
  title: string;
  slug: string;
}

export interface IArticleTagDto {
  id: string;
  name: string;
}

export interface IArticleListItemDto {
  id: string;
  title: string;
  slug: string;
  plainContent: string;
  viewCount: number;
  readMinute: number;
  createdAt: Date;
  series: IArticleSeriesDto;
  tags: IArticleTagDto[];
}

export interface IRequestGetArticlesDto extends IRequestOffsetPagingDto {
  seriesId?: string;
}

export interface IResponseGetArticlesDto extends IResponseOffsetPagingDto {
  items: IArticleListItemDto[];
}
