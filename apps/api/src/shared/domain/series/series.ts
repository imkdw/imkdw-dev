export class Series {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagIds: string[];
  createdAt: Date;

  private constructor(props: Series) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.description = props.description;
    this.tagIds = props.tagIds;
    this.createdAt = props.createdAt;
  }

  static create(props: Series): Series {
    return new Series(props);
  }
}
