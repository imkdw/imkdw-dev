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
      viewCount: entity.viewCount,
      createdAt: entity.createdAt,
      tagIds: [], // Repository에서는 tagIds를 채우지 않음 (별도 조회 필요)
    });
  }
}
