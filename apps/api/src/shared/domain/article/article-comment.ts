import { Requester } from '@/common/types/requester.type';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

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

  canReceiveReply(): boolean {
    return this.parentId === null;
  }

  canUpdate(requesterId: string): boolean {
    const isAuthor = this.authorId === requesterId;
    return isAuthor;
  }

  canDelete(requester: Requester): boolean {
    const isAuthor = this.authorId === requester.id;
    const isAdmin = requester.role === MEMBER_ROLE.ADMIN;
    return isAuthor || isAdmin;
  }
}
