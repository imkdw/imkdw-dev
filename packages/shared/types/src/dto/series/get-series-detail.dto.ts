import { ISeriesTagDto } from './series-tag.dto';

export interface ISeriesDetailDto {
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
