export class Series {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;

  private constructor(props: Series) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.createdAt = props.createdAt;
  }

  static create(props: Series): Series {
    return new Series(props);
  }
}
