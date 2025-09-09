export class Tag {
  id: string;
  name: string;
  createdAt: Date;

  private constructor(props: Tag) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
  }

  static create(props: Tag): Tag {
    return new Tag(props);
  }
}
