import { Series } from '@/shared/domain/series/series';
import { SeriesEntity } from '@/shared/entity/series/series.entity';

export class SeriesMapper {
  static toDomain(entity: SeriesEntity): Series {
    return Series.create({
      id: entity.id,
      title: entity.title,
      slug: entity.slug,
      createdAt: entity.createdAt,
    });
  }
}
