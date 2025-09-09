import { Tag } from '@/shared/domain/tag/tag';
import { Tag as PrismaTag } from '@prisma/client';

export class TagMapper {
  static toDomain(prismaTag: PrismaTag): Tag {
    return Tag.create({
      id: prismaTag.id,
      name: prismaTag.name,
      createdAt: prismaTag.createdAt,
      updatedAt: prismaTag.updatedAt,
      deletedAt: prismaTag.deletedAt,
    });
  }

  static toPersistence(tag: Tag): Omit<PrismaTag, 'updatedAt'> {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      deletedAt: tag.deletedAt,
    };
  }
}