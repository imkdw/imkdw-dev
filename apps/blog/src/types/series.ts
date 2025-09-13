export interface Article {
  id: number;
  title: string;
  description: string;
  readTime: string;
  publishedAt: string;
  order: number;
  slug: string;
}

export interface SeriesData {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  totalArticles: number;
  totalReadTime: string;
  articles: Article[];
}

export interface SeriesPageParams {
  slug: string;
}