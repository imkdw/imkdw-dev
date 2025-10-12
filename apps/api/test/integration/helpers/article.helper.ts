import type { PrismaClient, Article as PrismaArticle } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@imkdw-dev/utils';
import { Article } from '@/shared/domain/article/article';

export const createTestArticle = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data: {
    seriesId: string;
    title?: string;
    slug?: string;
    content?: string;
    viewCount?: number;
    readMinute?: number;
    createdAt?: Date;
    deletedAt?: Date | null;
  }
): Promise<PrismaArticle> => {
  const content = data.content ?? 'Test article content for integration testing';
  const plainContent = Article.stripHtmlTags(content);
  return prisma.article.create({
    data: {
      id: generateUUID(),
      title: data.title ?? `Test Article ${Date.now()}`,
      slug: data.slug ?? `test-article-${Date.now()}`,
      content: content,
      plainContent: plainContent,
      viewCount: data.viewCount ?? 0,
      readMinute: data.readMinute ?? 1,
      seriesId: data.seriesId,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
    },
  });
};
