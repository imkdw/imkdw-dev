import { Injectable } from '@nestjs/common';
import { Article } from '@/shared/domain/article/article';
import { ArticleMapper } from '@/shared/mapper/article/article.mapper';
import { PrismaService } from '@/infra/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(article: Article, tx: Prisma.TransactionClient = this.prisma): Promise<Article> {
    const updatedEntity = await tx.article.update({
      where: { id: article.id },
      data: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        content: article.content,
        seriesId: article.seriesId,
        viewCount: article.viewCount,
        readMinute: article.readMinute,
      },
    });

    await this.createArticleTags(article.id, article.tagIds, tx);

    return ArticleMapper.toDomain(updatedEntity);
  }

  async create(article: Article, tx: Prisma.TransactionClient = this.prisma): Promise<Article> {
    const createdEntity = await tx.article.create({
      data: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        content: article.content,
        seriesId: article.seriesId,
        viewCount: article.viewCount,
        readMinute: article.readMinute,
      },
    });

    await this.createArticleTags(article.id, article.tagIds, tx);

    return ArticleMapper.toDomain(createdEntity);
  }

  async findById(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<Article | null> {
    const entity = await tx.article.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findAll(tx: Prisma.TransactionClient = this.prisma): Promise<Article[]> {
    const entities = await tx.article.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return entities.map(entity => ArticleMapper.toDomain(entity));
  }

  async findByTitle(title: string, tx: Prisma.TransactionClient = this.prisma): Promise<Article | null> {
    const entity = await tx.article.findFirst({
      where: {
        title,
        deletedAt: null,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: string, tx: Prisma.TransactionClient = this.prisma): Promise<Article | null> {
    const entity = await tx.article.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.prisma.article.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
    });
  }

  async delete(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<void> {
    await tx.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private async createArticleTags(articleId: string, tagIds: string[], tx: Prisma.TransactionClient): Promise<void> {
    await tx.articleTag.deleteMany({
      where: { articleId },
    });

    await tx.articleTag.createMany({
      data: tagIds.map(
        (tagId): Prisma.ArticleTagCreateManyInput => ({
          articleId,
          tagId,
        })
      ),
    });
  }
}
