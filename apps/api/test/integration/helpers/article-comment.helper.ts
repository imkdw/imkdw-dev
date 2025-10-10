import type { PrismaClient, ArticleComment } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@imkdw-dev/utils';

/**
 * 테스트용 댓글 생성 (parentId = null)
 */
export const createTestComment = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data: { articleId: string; authorId: string; content?: string; createdAt?: Date }
): Promise<ArticleComment> => {
  return prisma.articleComment.create({
    data: {
      id: generateUUID(),
      content: data.content ?? `테스트 댓글 내용 ${Date.now()}`,
      articleId: data.articleId,
      authorId: data.authorId,
      createdAt: data.createdAt ?? new Date(),
    },
  });
};

/**
 * 테스트용 답글 생성 (parentId 필수)
 */
export const createTestReply = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data: { articleId: string; authorId: string; parentId: string; content?: string }
): Promise<ArticleComment> => {
  return prisma.articleComment.create({
    data: {
      id: generateUUID(),
      content: data.content ?? `테스트 답글 내용 ${Date.now()}`,
      articleId: data.articleId,
      authorId: data.authorId,
      parentId: data.parentId,
    },
  });
};
