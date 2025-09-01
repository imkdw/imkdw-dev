import { Article } from '@/shared/domain/article/article';
import { ArticleEntity } from '@/shared/entity/article/article.entity';

export class ArticleMapper {
  static toDomain(entity: ArticleEntity): Article {
    return Article.create({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
