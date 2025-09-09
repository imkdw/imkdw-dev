import { Injectable } from '@nestjs/common';
import { Tag } from '@/shared/domain/tag/tag';
import { TagMapper } from '@/shared/mapper/tag/tag.mapper';
import { PrismaService } from '@/infra/database/prisma.service';
import { generateUUID } from '@/common/utils/string.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByNames(names: string[], tx: Prisma.TransactionClient = this.prisma): Promise<Tag[]> {
    const entities = await tx.tag.findMany({
      where: {
        name: { in: names },
        deletedAt: null,
      },
    });

    return entities.map(entity => TagMapper.toDomain(entity));
  }

  async createMany(names: string[], tx: Prisma.TransactionClient = this.prisma): Promise<Tag[]> {
    const tagData = names.map(name => ({
      id: generateUUID(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }));

    await tx.tag.createMany({
      data: tagData,
      skipDuplicates: true,
    });

    return this.findByNames(names, tx);
  }

  async findOrCreateMany(names: string[], tx: Prisma.TransactionClient = this.prisma): Promise<Tag[]> {
    const existingTags = await this.findByNames(names, tx);
    const existingNames = existingTags.map(tag => tag.name);
    const newNames = names.filter(name => !existingNames.includes(name));

    if (newNames.length > 0) {
      const newTags = await this.createMany(newNames, tx);
      return [...existingTags, ...newTags];
    }

    return existingTags;
  }
}
