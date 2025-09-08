import { Article } from '@/shared/domain/article/article';
import { ArticleEntity } from '@/shared/entity/article/article.entity';

export class ArticleMapper {
  static toDomain(entity: ArticleEntity): Article {
    return Article.create({
      id: entity.id,
      title: entity.title,
      slug: entity.slug,
      content: entity.content,
      seriesId: entity.seriesId,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
