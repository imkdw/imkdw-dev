import { ArticleComment } from '@/shared/domain/article/article-comment';
import { generateUUID } from '@imkdw-dev/utils';

interface Props {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
}

export function createTestComment(data?: Partial<Props>): ArticleComment {
  return ArticleComment.create({
    id: generateUUID(),
    content: 'test comment',
    articleId: generateUUID(),
    authorId: generateUUID(),
    parentId: null,
    createdAt: new Date(),
    ...data,
  });
}

export function createTestReply(parentId: string, data?: Partial<Props>): ArticleComment {
  return ArticleComment.create({
    id: generateUUID(),
    content: 'test reply',
    articleId: generateUUID(),
    authorId: generateUUID(),
    parentId,
    createdAt: new Date(),
    ...data,
  });
}
