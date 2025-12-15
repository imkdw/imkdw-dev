import type { PrismaClient, Article as PrismaArticle } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@imkdw-dev/utils';
import { ArticleContent } from '@/shared/domain/article/article-content';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

export const createTestArticle = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data: {
    seriesId: string;
    title?: string;
    slug?: string;
    content?: string;
    viewCount?: number;
    readMinute?: number;
    state?: string;
    createdAt?: Date;
    deletedAt?: Date | null;
  }
): Promise<PrismaArticle> => {
  const content = new ArticleContent(data.content ?? 'Test article content for integration testing');
  return prisma.article.create({
    data: {
      id: generateUUID(),
      title: data.title ?? `Test Article ${Date.now()}`,
      slug: data.slug ?? `test-article-${Date.now()}`,
      content: content.value,
      plainContent: content.toPlainText(),
      viewCount: data.viewCount ?? 0,
      readMinute: data.readMinute ?? 1,
      state: data.state ?? ARTICLE_STATE.NORMAL,
      seriesId: data.seriesId,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
    },
  });
};
