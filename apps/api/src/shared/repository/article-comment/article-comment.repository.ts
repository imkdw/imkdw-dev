import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticleComment } from '@/shared/domain/article-comment/article-comment';
import { ArticleCommentMapper } from '@/shared/mapper/article-comment/article-comment.mapper';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class ArticleCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(comment: ArticleComment, tx: Prisma.TransactionClient = this.prisma): Promise<ArticleComment> {
    const createdEntity = await tx.articleComment.create({
      data: {
        id: comment.id,
        content: comment.content,
        articleId: comment.articleId,
        authorId: comment.authorId,
        parentId: comment.parentId,
        createdAt: comment.createdAt,
      },
    });

    return ArticleCommentMapper.toDomain(createdEntity);
  }

  async save(comment: ArticleComment, tx: Prisma.TransactionClient = this.prisma): Promise<ArticleComment> {
    const updatedEntity = await tx.articleComment.update({
      where: { id: comment.id },
      data: {
        content: comment.content,
      },
    });

    return ArticleCommentMapper.toDomain(updatedEntity);
  }

  async delete(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<void> {
    await tx.articleComment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: string, tx: Prisma.TransactionClient = this.prisma): Promise<ArticleComment | null> {
    const entity = await tx.articleComment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return entity ? ArticleCommentMapper.toDomain(entity) : null;
  }

  async findByArticleId(articleId: string, tx: Prisma.TransactionClient = this.prisma): Promise<ArticleComment[]> {
    const entities = await tx.articleComment.findMany({
      where: {
        articleId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return entities.map(entity => ArticleCommentMapper.toDomain(entity));
  }

  async findByParentId(parentId: string, tx: Prisma.TransactionClient = this.prisma): Promise<ArticleComment[]> {
    const entities = await tx.articleComment.findMany({
      where: {
        parentId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return entities.map(entity => ArticleCommentMapper.toDomain(entity));
  }
}