import { ArticleComment } from '@/shared/domain/article-comment/article-comment';
import { ArticleCommentEntity } from '@/shared/entity/article-comment/article-comment.entity';

export class ArticleCommentMapper {
  static toDomain(entity: ArticleCommentEntity): ArticleComment {
    return ArticleComment.create({
      id: entity.id,
      content: entity.content,
      articleId: entity.articleId,
      authorId: entity.authorId,
      parentId: entity.parentId,
      createdAt: entity.createdAt,
    });
  }
}
