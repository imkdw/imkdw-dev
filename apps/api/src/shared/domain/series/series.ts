export class Series {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  deletedAt: Date | null;

  private constructor(props: Series) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }

  static create(props: Series): Series {
    return new Series(props);
  }
}
