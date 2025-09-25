import { Article } from '@/shared/domain/article/article';

export interface SeriesProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  articleCount: number;
  totalReadMinute: number;
  lastArticleCreatedAt: Date | null;
  tagIds: string[];
  createdAt: Date;
}

export class Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  articleCount: number;
  totalReadMinute: number;
  lastArticleCreatedAt: Date | null;
  tagIds: string[];
  createdAt: Date;

  private constructor(props: SeriesProps) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.description = props.description;
    this.articleCount = props.articleCount;
    this.totalReadMinute = props.totalReadMinute;
    this.lastArticleCreatedAt = props.lastArticleCreatedAt;
    this.tagIds = props.tagIds;
    this.createdAt = props.createdAt;
  }

  static create(props: SeriesProps): Series {
    return new Series(props);
  }

  recalculateStats(articles: Article[]): Series {
    const articleCount = articles.length;
    const totalReadMinute = articles.reduce((sum, article) => sum + article.readMinute, 0);
    const lastArticleCreatedAt =
      articles.length > 0
        ? (articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]?.createdAt ?? null)
        : null;

    return Series.create({
      ...this,
      articleCount,
      totalReadMinute,
      lastArticleCreatedAt,
    });
  }
}
