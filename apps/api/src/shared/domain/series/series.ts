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

  private constructor(props: Series) {
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

  static create(props: Series): Series {
    return new Series(props);
  }
}
