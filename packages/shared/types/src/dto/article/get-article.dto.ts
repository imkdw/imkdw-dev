import { IArticleSeriesDto, IArticleTagDto } from './get-articles.dto';

export interface IArticleDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  viewCount: number;
  readMinute: number;
  createdAt: Date;
  series: IArticleSeriesDto;
  tags: IArticleTagDto[];
}

export interface IArticleNavigationDto {
  id: string;
  title: string;
  slug: string;
}

export interface IResponseGetArticleDto {
  article: IArticleDto;
  prevArticle: IArticleNavigationDto | null;
  nextArticle: IArticleNavigationDto | null;
}
