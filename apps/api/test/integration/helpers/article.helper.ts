import type { PrismaClient, Article } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@/common/utils/string.util';

export const createTestArticle = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data?: Partial<Article>
): Promise<Article> => {
  return prisma.article.create({
    data: {
      id: generateUUID(),
      title: data?.title ?? `Test Article ${Date.now()}`,
      content: data?.content ?? 'Test article content for integration testing',
      ...data,
    },
  });
};
