import { Article } from '@/shared/domain/article/article';
import { ArticleEntity } from '@/shared/entity/article/article.entity';

export class ArticleMapper {
  static toDomain(entity: ArticleEntity): Article {
    return Article.create({
      id: entity.id,
      title: entity.title,
      slug: entity.slug,
      content: entity.content,
      plainContent: entity.plainContent,
      seriesId: entity.seriesId,
      viewCount: entity.viewCount,
      readMinute: entity.readMinute,
      createdAt: entity.createdAt,
      tagIds: [],
    });
  }
}
