export interface IRssArticleDto {
  title: string;
  slug: string;
  plainContent: string;
  createdAt: Date | string;
  seriesTitle: string;
  tagNames: string[];
}
