interface Props {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
}

export class ArticleComment {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;

  private constructor(props: Props) {
    this.id = props.id;
    this.content = props.content;
    this.articleId = props.articleId;
    this.authorId = props.authorId;
    this.parentId = props.parentId;
    this.createdAt = props.createdAt;
  }

  static create(props: Props): ArticleComment {
    return new ArticleComment(props);
  }

  /**
   * 답글 작성 가능 여부 확인
   * 댓글인 경우만 답글 작성 가능 (답글에는 답글 불가)
   */
  canReceiveReply(): boolean {
    return this.parentId === null;
  }
}
