import { Injectable } from '@nestjs/common';
import { Series } from '@/shared/domain/series/series';
import { SeriesMapper } from '@/shared/mapper/series/series.mapper';
import { PrismaService } from '@/infra/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(series: Series): Promise<Series> {
    const createdEntity = await this.prisma.series.create({ data: series });

    return SeriesMapper.toDomain(createdEntity);
  }

  async update(id: string, series: Series): Promise<void> {
    await this.prisma.series.update({
      where: { id },
      data: series,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.series.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findById(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<Series | null> {
    const entity = await tx.series.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return entity ? SeriesMapper.toDomain(entity) : null;
  }

  async findByTitle(title: string, tx: Prisma.TransactionClient = this.prisma): Promise<Series | null> {
    const entity = await tx.series.findFirst({
      where: {
        title,
        deletedAt: null,
      },
    });

    return entity ? SeriesMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string, tx: Prisma.TransactionClient = this.prisma): Promise<Series | null> {
    const entity = await tx.series.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });

    return entity ? SeriesMapper.toDomain(entity) : null;
  }

  async findAll(tx: Prisma.TransactionClient = this.prisma): Promise<Series[]> {
    const entities = await tx.series.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    return entities.map(entity => SeriesMapper.toDomain(entity));
  }
}
