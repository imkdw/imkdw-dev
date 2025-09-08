export class Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  seriesId: string;
  createdAt: Date;
  deletedAt: Date | null;

  private constructor(props: Article) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.seriesId = props.seriesId;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }

  static create(props: Article): Article {
    return new Article(props);
  }
}
