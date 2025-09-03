export class CreateArticleCommand {
  constructor(
    public title: string,
    public content: string
  ) {
    this.validate();
  }

  private validate() {}
}
