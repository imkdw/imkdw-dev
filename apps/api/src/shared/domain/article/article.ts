export class Article {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;

  private constructor(props: Article) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }

  static create(props: Article): Article {
    return new Article(props);
  }
}
