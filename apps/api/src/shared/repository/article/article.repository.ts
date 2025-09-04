import { Injectable } from '@nestjs/common';
import { Article } from '@/shared/domain/article/article';
import { ArticleMapper } from '@/shared/mapper/article/article.mapper';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(article: Article): Promise<Article> {
    const updatedEntity = await this.prisma.article.update({
      where: { id: article.id },
      data: article,
    });

    return ArticleMapper.toDomain(updatedEntity);
  }

  async create(article: Article): Promise<Article> {
    const createdEntity = await this.prisma.article.create({ data: article });

    return ArticleMapper.toDomain(createdEntity);
  }

  async findById(id: string): Promise<Article | null> {
    const entity = await this.prisma.article.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Article[]> {
    const entities = await this.prisma.article.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return entities.map(entity => ArticleMapper.toDomain(entity));
  }

  async findByTitle(title: string): Promise<Article | null> {
    const entity = await this.prisma.article.findFirst({
      where: {
        title,
        deletedAt: null,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }
}
